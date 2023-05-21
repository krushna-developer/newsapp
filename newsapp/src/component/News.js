import React, { useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

const News=(props)=> {
const [articles, setArticles] = useState([])
const [ loading, setLoading] = useState(false)
const [page, setPage] = useState(1)
const [totalResults, setTotalResults]=useState(0)
 //document.title=`${this.capitalizeFirstLetter(category)}-Newsmonkey`;

   
      const capitalizeFirstLetter=( string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
     }

    
    
    const updateNews=async()=>{
        console.log("cdm");
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b860c89b06584f4ebe67119d249c473b&page=1&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles (parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
            
    }
    
    useEffect(()=>{
        updateNews();
    },[])

     const handlePreviousClick = async () => {
        console.log("previous")
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b860c89b06584f4ebe67119d249c473b&page= ${page - 1}&pageSize=${props.pageSize}`;
        setLoading(true)

        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles (parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        setPage(page-1)
        
    }


     const handleNextClick = async () => {
        console.log("Next");
        if (page + 1 > Math.ceil(totalResults / props.pageSize)) {

        }
        else {
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b860c89b06584f4ebe67119d249c473b&page= ${page + 1}&pageSize=${props.pageSize}`;
            setLoading(true)
            let data = await fetch(url);
            let parsedData = await data.json()
            console.log(parsedData);
       
            setArticles (parsedData.articles)
            setTotalResults(parsedData.totalResults)
            setLoading(false)
            setPage(page+1)
            
            

    }
    }




        return (
            <>
            <div className="container my-3">
                <h1 className="text-center" style={{marginTop:'80px'}}  > NewsMonkey- Top Headlines</h1>
                {loading &&<Spinner/>}
                <div className='row'>
                    {!loading && articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                        </div>
                    })}
                    <div className="container d-flex justify-content-between">

                        <button disabled={page <= 1} type="button" onClick={handlePreviousClick} className="btn btn-dark">&larr;Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults /props.pageSize)} type="button" onClick={handleNextClick} className="btn btn-dark">Next	&rarr;</button>
                    </div>


                </div>
            </div>
            </>
        )}
                
  News.defaultProps ={
    country:'in',
    pageSize:9,
    category:'general'
}
  News.propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
}
export default News