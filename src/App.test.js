import { render, screen, waitForElementToBeRemoved, within } from "@testing-library/react"
import '@testing-library/jest-dom'
import App from "./App"
import userEvent from "@testing-library/user-event"

describe("Todo App", () => {

    beforeEach(() => {
        localStorage.clear();
    })

    it("Renders correctly", () => {
        render(<App />)
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument()
    })

    it("Starts with an empty list", () => {
        render(<App />)
        const emptyMsg = screen.getByText(/No tasks/i)
        expect(emptyMsg).toBeInTheDocument()
    })

    it("Open new task modal", async () => {
        render(<App />)

        const newTaskBtn = screen.getByRole('button', { name: /New Task/i });
        await userEvent.click(newTaskBtn);

        const modal = await screen.findByRole('dialog');
        expect(modal).toBeInTheDocument()
    })

    it("Show error on empty title", async () => {
        render(<App />)

        const newTaskBtn = screen.getByRole('button', { name: /New Task/i });
        await userEvent.click(newTaskBtn);


        const modal = await screen.findByRole('dialog');

        const createTaskBtn = await within(modal).findByRole('button', { name: /Create task/i });
        await userEvent.click(createTaskBtn);


        const errorMsg = await within(modal).getByRole('alert');
        expect(errorMsg).toBeInTheDocument()
    })

    it("Creates a new task", async () => {
        render(<App />)

        await createTask({ title: "Task 1 title", summary: "Task 1 summary" });
        const newTask = screen.getByText(/Task 1 title/i);
        expect(newTask).toBeInTheDocument()
    })

    it("Creates 2 tasks", async () => {
        render(<App />)

        await createTask({ title: "Task 1 title", summary: "Task 1 summary" });
        await createTask({ title: "Task 2 title", summary: "Task 2 summary" });

        const newTask2 = screen.getByText(/Task 2 title/i);
        const newTask1 = screen.getByText(/Task 1 title/i);

        expect(newTask1).toBeInTheDocument()
        expect(newTask2).toBeInTheDocument()

        const tasksCards = screen.getAllByTestId('task-card');
        expect(tasksCards).toHaveLength(2);
    })

    it("Deletes a task", async () => {
        render(<App />)

        await createTask({ title: "Task To Delete", summary: "Task 1 summary" });

        const taskCard = screen.getByTestId('task-card');
        const deleteBtn = within(taskCard).getByRole('button');
        await userEvent.click(deleteBtn);

        expect(taskCard).not.toBeInTheDocument()
    })
})


async function createTask({ title, summary }) {

    const newTaskBtn = await screen.findByRole('button', { name: /New Task/i });
    await userEvent.click(newTaskBtn);

    const modal = await screen.findByRole('dialog');

    const titleInput = within(modal).getByLabelText(/title/i);
    await userEvent.type(titleInput, title);


    const summaryInput = within(modal).getByLabelText(/summary/i);
    await userEvent.type(summaryInput, summary);

    const createTaskBtn = within(modal).getByRole('button', { name: /Create task/i });
    await userEvent.click(createTaskBtn);
}