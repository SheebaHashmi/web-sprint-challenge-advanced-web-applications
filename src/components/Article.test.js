import React from 'react';
import '@testing-library/jest-dom';
import {render,screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const testArticle ={
    author:"test author",
    body:"test",
    createdOn:"12-17-2021",
    headline:"test",
    id:1,
    image:172,
    summary:"test"
}
const testArticleWithNoAuthor = {
    author:"",
    body:"test",
    createdOn:"12-17-2021",
    headline:"test",
    id:1,
    image:172,
    summary:"test"
}

test('renders component without errors', ()=> {
    render(<Article article={testArticle}/>)
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testArticle}/>)

    const headline = screen.queryByTestId(/headline/i);
    const author = screen.queryByTestId(/author/i);

    expect(headline).toBeInTheDocument();
    expect(headline).toBeTruthy()

    expect(author).toBeInTheDocument();
    expect(author).toBeTruthy();

});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testArticleWithNoAuthor}/>);

    const author = screen.queryByTestId(/author/i);

    expect(author).toBeInTheDocument();
    expect(author).toHaveTextContent(/Associated Press/i)

});

test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn()
    render(<Article article={testArticle} handleDelete={handleDelete}/>);

    const button = screen.queryByTestId(/deleteButton/i)

    userEvent.click(button);
    
    expect(handleDelete).toBeCalled();
    expect(handleDelete).toBeCalledTimes(1);


});

//Task List: 
//1. Complete all above tests. Create test article data when needed.