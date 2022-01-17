class Model{
	constructor(){
		// data
		this.tasks = [
			 {id:1, text: 'Be good', complete: false},
		 	 {id:2, text: 'Be nice', complete: false}
		]
	}

	addTask(taskText){
		// create id
		let id
		if(this.tasks.length > 0){
			id = this.tasks[this.tasks.length -1].id + 1
		} else {
			id = 1
		}
		// create task object
		const task = {
			id: id,
			text: taskText,
			complete: false
		}
		// add task to this.tasks
		this.tasks.push(task)
		this.displayTasks(this.tasks)
	}
	// 
	taskListChanged(callback){
		this.displayTasks = callback
	}
}

class View{
	constructor(){
		// basic view
		// root element
		this.app = this.getElement('#root')
		// title
		this.title = this.setElement('h1')
		this.title.textContent = 'Tasks'
		// form
		this.form = this.setElement('form')
		// form input
		this.input = this.setElement('input')
		this.input.type = 'text'
		this.input.name = 'task'
		this.input.placeholder = 'Add new task'

		// submit button
		this.submitBtn = this.setElement('button')
		this.submitBtn.textContent = 'Add'
		// task list
		this.taskList = this.setElement('ul')
		// append input and submit to form
		this.form.append(this.input, this.submitBtn)
		// append title and task list to app
		this.app.append(this.title, this.form, this.taskList)
	}
	// display tasks
	displayTasks(tasks){
		 while(this.taskList.firstChild){
      		this.taskList.removeChild(this.taskList.firstChild)
      	}
		if(tasks.len = 0){
			const p = this.setElement('p')
			p.textContent = 'Add a task to do'
			this.taskList.append(p)
		} else {
			tasks.forEach(task => {
				const li = document.createElement('li')
				li.id = task.id
				// task item complete toggle check
				const checkbox = this.setElement('input')
				checkbox.type = 'checkbox'
				checkbox.checked = task.complete
				// text span
				const span = this.setElement('span')
				// if task item is complete - strike through
				if(task.complete === true){
					const strike = this.setElement('s')
					strike.textContent = task.text
					span.append(strike)
				} else {
					span.textContent = task.text
				}
				const deleteBtn = this.setElement('button', 'delete')
				deleteBtn.textContent = 'Delete'
				// append checkbox and span to li
				li.append(checkbox, span, deleteBtn)
				// appen created li to task list
				this.taskList.append(li)
			})
		
		}
	}
	// events
	addTask(handler){
		this.form.addEventListener('submit', event => {
			event.preventDefault()
			if(this._taskText){
				handler(this._taskText)
			}
			this.resetInput()
		})
	}

	deleteTask(){

	}

	getElement(selector){
		const element = document.querySelector(selector)
		return element
	}

	get _taskText(){
		return this.input.value
	}

	// setters
	setElement(tag, classname){
		const element = document.createElement(tag)
		if(classname !== undefined){
			element.classList.add(classname)
		}
		return element
	}

	// resetter
	resetInput(){
		this.input.value = ""
	}
}

class Controller{
	constructor(model, view){
		this.model = model
		this.view = view

		this.model.taskListChanged(this.displayTasks)
		this.view.addTask(this.handleAddTask)

		this.displayTasks(this.model.tasks)
	}

	displayTasks = tasks => {
		this.view.displayTasks(tasks)
	}
	handleAddTask = taskText => {
		this.model.addTask(taskText)
	}
}

const app = new Controller(new Model(), new View())