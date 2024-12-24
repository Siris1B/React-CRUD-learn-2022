import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {name: '1', salary: 800, increase: true, rise: true, id: 1},
                {name: '2', salary: 1800, increase: false, rise: false, id: 2},
                {name: '3', salary: 111800, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === +id);
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1)

            // const newArr = [...before, ...after];


            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }


    onToggleProp = (id, prop) => {
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);

        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

        //     return {
        //         data: newArr
        //     }
        // })

        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    seatchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    filterEmp = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'more':
                return items.filter(item => item.salary >= 1000);
            default:
                return items
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term} = this.state;
        const visibleData = this.filterEmp(this.seatchEmp(data, term), this.state.filter);
        return (
            <div className="app">
                <AppInfo all={this.state.data.length}
                         more={this.state.data.filter(item => item.increase === true).length }
                         ></AppInfo>
    
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}></SearchPanel>
                    <AppFilter filter={this.state.filter} onFilterSelect={this.onFilterSelect}></AppFilter>
                </div>
    
                <EmployersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    ></EmployersList>
                <EmployersAddForm onAdd={this.addItem}></EmployersAddForm>
            </div>
        )
    }
}

export default App;