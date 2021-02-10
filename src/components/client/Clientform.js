import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import ClientList from './ClientList';
import AddClient from './Addclient';

class Clientform extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="List"
                    tabtwolabel="Clientform"
                    componentone={<ClientList />}
                    componenttwo={<AddClient />}
                   
                />
            </React.Fragment>
        )
    }
}

export default Clientform;