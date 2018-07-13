import * as React from 'react';
import {ListGroup, ListGroupItem,} from "reactstrap";
import SortableTree from 'react-sortable-tree';

interface DbData {
    id: number;
    items: Array<String>;
}

interface Props {
    data?: any;
}

interface State {
    data?: any;
}

class ItemList extends React.Component<Props, State> {


    render() {
        const {data} = this.props;
        console.log(data&&data.data);
        return <ListGroup>
            {/*<Tree>{this.state.treeData.map(data => <TreeNode />)}</Tree>*/}

            {/*<h1>{data._id}</h1>*/}
            <SortableTree
                treeData={data&&data.data}
                onChange={treeData => this.setState(data&&data.data)}
            />

        </ListGroup>
    }
}

export default ItemList;

