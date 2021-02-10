import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import Addexpense from './Addexpense';
import Expenseview from './Expenseview'


class Productivitytab  extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs 
                    tabonelabel="Add expense"
                    tabtwolabel="Expense View"
                  
                    componentone=  {<Addexpense/>}
                    componenttwo={<Expenseview/>}
               />

        </React.Fragment>
        )
    }
}
export default Productivitytab;