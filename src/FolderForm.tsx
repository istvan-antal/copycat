import * as React from 'react';
import { actions } from './actions';

interface Prop {
    addFolder: typeof actions['addFolder'];
}

interface State {
    path: string;
}

export default class FolderForm extends React.Component<Prop, State> {
    render() {
        return (
            <form>
                <input onChange={e => { this.setState({ path: e.target.value, }); }} type="text" />
                <button onClick={e => { this.props.addFolder(this.state.path); e.preventDefault(); }}>Create</button>
            </form>
        );
    }
}