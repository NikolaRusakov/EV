import * as React from 'react';
import {ListGroup, ListGroupItem,} from "reactstrap";
interface DbData {
    id: number;
    items: Array<String>;
}

interface Props {
    data?: any;
}

interface State {
    count: number;
}

class ItemList extends React.Component<Props, State> {

    render() {
        const {data} = this.props;
        console.log(data);
        return <ListGroup>
            {/*<Tree>{this.state.treeData.map(data => <TreeNode />)}</Tree>*/}

            <h1>{data._id}</h1>
            {data.map((item) =>
              item.data.map((i,index)=>[
                  <h5>{i.id}</h5>,
                  i.items.map(vocab=>
                      <ListGroupItem tag="button" action>{vocab}</ListGroupItem>
                  )
              ])
            )
            }
        </ListGroup>
    }
}

export default ItemList;

