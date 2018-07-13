import * as React from 'react';
import {ListGroup, ListGroupItem,} from "reactstrap";
import SortableTree from 'react-sortable-tree';


class ItemList extends React.Component{


    render() {
        const {data} = this.props;
        console.log(data&&data.data);
        return <div  style={{ height: 768 }}>
            {/*<Tree>{this.state.treeData.map(data => <TreeNode />)}</Tree>*/}

            {/*<h1>{data._id}</h1>*/}
            <SortableTree
                treeData={data&&data.data}
                onChange={treeData => this.setState(data&&data.data)}
            />

        </div>
    }
}

export default ItemList;

