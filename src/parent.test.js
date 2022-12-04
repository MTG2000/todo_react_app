import { render, screen } from "@testing-library/react"
import Parent from "./Parent"
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"

describe('Parent Component', () => {

    it('renders correctly now', () => {
        render(<Parent />);
        const elm = screen.getByText(/Parent:/);
        expect(elm).toBeInTheDocument();
    })

    it('updates state', () => {
        render(<Parent />);

        const inputElm = screen.getByRole('textbox');
        userEvent.type(inputElm, "Hello World!!");

        const submitBtn = screen.getByRole('button', { name: /submit/i });
        userEvent.click(submitBtn);

        const resultTxt = screen.getByText(/Parent: Hello World!!/i);
        expect(resultTxt).toBeInTheDocument();

    })
})