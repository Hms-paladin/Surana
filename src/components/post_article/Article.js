import React from 'react'
import CenteredTabs from '../../tabcomponent/tabs';
import ArticleList from './ArticleList';
import PostApproved from './PostApproved';
import PostArticle from './PostArticle';

class Article extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="List"
                    tabtwolabel="Post Article"
                    tabthreelabel="Article Approved"
                    componentone={<ArticleList />}
                    componenttwo={<PostArticle />}
                    componentthree={<PostApproved />}
                />
            </React.Fragment>
        )
    }
}

export default Article;