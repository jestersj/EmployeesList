import React from 'react';
import UserList from "@/components/UserList/UserList";
import SortFilterRow from "@/components/SortFilterRow/SortFilterRow";

const HomePage = () => {
    return (
        <main className={'container'}>
            <SortFilterRow/>
            <UserList/>
        </main>
    );
};

export default HomePage;