import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




export default class News extends Component {

  static defaultProps ={
    country:'in',
    category:"general"
  }
  static propTypes={
    country: PropTypes.string,  
    category: PropTypes.string
  }


 capitalizeFirstLetter=(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
  }


  constructor(props) {
    super(props);
    this.state={    
      articles:[],
      loading: false,    
      page:1, 
      totalResults:0
    }
    document.title= `${this.capitalizeFirstLetter(this.props.category)}-NewsZones`;
  }




  async componentDidMount(){
    this.props.setProgress(10);
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}`;
    this.setState({loading: true});
    let data= await fetch(url);
    this.props.setProgress(30);
    let parseData= await data.json();
    this.props.setProgress(70);
    console.log(parseData);
    this.setState({
        articles: parseData.articles,
        totalResults:parseData.totalResults,
        loading: false 

    })
    this.props.setProgress(100)
    }





fetchMoreData = async () => {
  this.setState((prevState) => ({
    page: prevState.page + 1
  }), async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false
    });
  });
}



  render() {
    return (
      <>
        <h2 className="text-center mb-3">NewsZones-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>}
       >
       <div className="container my-3">
            <div className="row">
               {this.state.articles.map((element)=>{
                    return  <div className="col-md-4" key={element.url}>
                                <NewsItem  title={element.title ? element.title.slice(0,45):""} description={element.description ? element.description.slice(0,88):""}
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />  
                              </div>
              })}
            </div>
            </div>
        </InfiniteScroll>
    </>
    )
  }
}



 
