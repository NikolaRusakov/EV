import * as React from 'react';
import {Tree, Input} from 'antd';
import {connect} from "react-redux";
import {lookup, googleLookup} from "../lib/index";
import {callApi} from "../../../typescript/src/api";

const pify = require('pify');

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

class TreeList extends React.Component {
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onChange = (e) => {
        const value = e.target.value;
        const expandedKeys = dataList.map((item) => {
            if (item.title.indexOf(value) > -1) {
                return getParentKey(item.key, gData);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    }

    handleClick = async (e) => {
        console.log(e);
        e.event.preventDefault();
        await callApi(`getWord/${e.node.props.title.props.children}`).then(res => {
            console.log(res);
        }).catch(err => console.error(err));
        console.log(navigator.appName);
        await callApi(`getPowerThesaurus/${navigator.appName}/${e.node.props.title.props.children}`).then(res => {
            console.log(res);
        }).catch(err => console.error(err));

 // await callApi(`getGoogleThesaurus/${e.node.props.title.props.children}`).then(res => {
 //            console.log(res);
 //        }).catch(err => console.error(err));

        // const thesaurus = pify(lookup(e.node.props.title.props.children)
        //     .then(results => {
        //         return results
        //     }));
        /* translate(e.node.props.title.props.children, {to: 'en'}).then(res => {
            console.log(res.text);
            //=> I speak English
            console.log(res.from.language.iso);
            //=> nl
        }).catch(err => {
            console.error(err);
        });*/
        // console.log();
    };

    render() {
        const {searchValue, expandedKeys, autoExpandParent} = this.state;
        const {data} = this.props;
        const loop = data => data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title = index > -1 ? (
                <span>
          {beforeStr}
                    <span style={{color: '#f50'}}>{searchValue}</span>
                    {afterStr}
        </span>
            ) : <span>{item.title}</span>;
            if (item.children) {
                console.log(item.children)
                return (
                    <TreeNode key={item.key} title={title}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={title}/>;
        });

        const contentTreeNodes = (data) => data.map((item) => {
            // const index = item.title.indexOf(searchValue);
            // const beforeStr = item.title.substr(0, index);
            // const afterStr = item.title.substr(index + searchValue.length);
            const title = <span>{item.title}</span>;
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={title}>
                        {
                            contentTreeNodes(item.children)
                        }
                    </TreeNode>)
                    ;
            }
            return <TreeNode key={item.key} title={title}/>;
        });
        return (
            <div>
                <Search style={{marginBottom: 8}} placeholder="Search" onChange={this.onChange}/>

                <Tree onExpand={this.onExpand}
                      expandedKeys={expandedKeys}
                      autoExpandParent={autoExpandParent}
                      onRightClick={(e)=>this.handleClick(e)}
                >
                    {contentTreeNodes(data[0].data)}
                </Tree>
            </div>
        );
    }
}

export default connect()(TreeList);