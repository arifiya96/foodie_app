import React from 'react';
import { Header, Item, Input, Icon, Button, Text } from 'native-base';

const Search = () => {
    return (
        <Header searchBar rounded>
            <Item>
                <Icon name="ios-search"></Icon>
                <Input placeholder="Search"></Input>
                <Icon name="ios-fast-food"></Icon>
            </Item>
            <Button transparent>
                <Text>Search</Text>
            </Button>
        </Header>
    )
}

export default Search;