import React, {Component} from 'react';
import axios from 'axios';
import Card from '../../components/Artist/ArtistCard';

class Landing extends Component{
    state = {
        page : 0,
        items : []
    }
    componentDidMount() {
       // this.getData();
    }

    getData = async () => {
        try {
            const res = await axios.get('/api/top/' + this.state.page);
            if(res){

                const page = this.state.page;
                const items = this.state.items;
                const newItems = res.data.items;
                this.setState(
                    {
                        page : page + 1,
                        items : [...items, ...newItems]
                    }
                )
            }
        }catch(e){

        }
    }

    render(){
        return (
            <div style={{textAlign:'center'}}>
                <h1>EYO0</h1>
                {this.state.items.map( item => {
                    return (<Card
                            name={item.name}
                            img={item.images[0].url}>
                                </Card>
                    );
                })}

            </div>
        );
    }

}

export default Landing;