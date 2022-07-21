# Formik

* * *

> Form state is local and ephimeral: It means that we don't necesarrily need an external state management system. Forms are like a big uncontrolled component.

## Goals of Formik

1.  Give back Render Control
2.  Solve for 80% of use cases
3.  "battery pack included" i.e we don't have to know every implementation details and use state management system
4.  Incrementally Adoptable
5.  No magic

### Forms 

---

- Vital for business applications

- create an experience that guides the user efficiently and effectively through the workflow

- Developers
	- Handle form data
	- validation
	- visual feedback with error messages
	- form submissions

### What is Formik?
Formik is a small library that helps you deal with forms in react

### Why use Formik?
* Managing form data
* Form Submission
* Form validation and displaying error messages
* Formik helps you deal with forms in a scalable, performant and easy way

### Prerequisites
* HTML
* CSS
* JavaScript
* React(Hooks)

### Structure
- Build a simple form
- useFormik Hook
- Manage the form state
- Handle form submission
- form validation
- formik components
- few handy features
- Reusable components for input, text area, select, radio buttons and checkboxes
- Build a user registration form 
- Wire up a UI library

## 1. Simple Form

![simpleFormikForm](/images/FormikSimpleForm.png)
```
import "./styles.css";
import YoutubeForm from "./components/YoutubeForm";
import { useFormik } from "formik";

export default function App() {

  const formik = useFormik({})		// this formik object will help us with the three points of form 1. Managing the form state 2. Handling form submission 3. Validation and error messages

  return (
    <div className="App">
      <YoutubeForm />
    </div>
  );
}
```

## What is the meaning Managing Form State
![formStateManaging](/images/ManageFormState.png)

Here we have a form with three form fields
the *useFormik* hook from *formik* returns an object which we are storing in a constant called *formik* and this object contains the properties and methods for us to manage our form state.
* **Step 1:** pass in a property called initialValues in the object we pass to the useFormik hook
```
const formik = useFormik({
	initialValue: {
		name: '',
		email: '',
		channel: '',
	}
})
```
**It is very important to note that the properties for *initialValues* corresponds to the name attribute of the individual fields**

* **step 2:** we need to add *onChange* and the *value* prop for each of the form fields this is required to insure the form fields are tracked in react by formik. This is where the *formik* constant comes into picture for onChange we assign ***formik.handleChange*** and for values we specify ***formik.values.nameOfPropery*** nameOfProperty is the name attribute value of the individual form fields. Once we do this formik will automatically track the form field values for us.
```
<form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />

        <label htmlFor="email">email</label>
        <input type="email" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" name="channel" onChange={formik.handleChange} value={formik.values.channel} />

        <button>Submit</button>
</form>
```
**if we *console.log(formik.values)* we will get an object containing form vlues**
![formikObject](/images/FormikValuesObj.png)

***This is prety much how formik manages the form state***
## Handling Form Submission
Handling form submissions with formik is really simple there are two steps: -
* **step 1:** We need to specify the ***onSubmit*** handler of the form tag which is going to be equal to ***formik.handleSubmit***
```
<form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />

        <label htmlFor="email">email</label>
        <input type="email" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" name="channel" onChange={formik.handleChange} value={formik.values.channel} />

        <button>Submit</button>
</form>
```
* **step 2:** we need to revisit the object we passed in the to the useFormik hook, as it turns out apart from initial values we can specify another property called onSubmit which is a method that automatically recieves the form state as its argument when the Submit button is pressed
```
const formik = useFormik({
	initialValue: {
		name: '',
		email: '',
		channel: '',
	},
	onSubmit: values => {
		console.log("form data", values);
	}
})
```
![formikOnSubmit](/images/FormikOnSubmitProp.png)
**solution for warning** add type=submit in our button 
```
<button type="submit">Submit</button>
```

## Form Validation
***Validation Rules we are going to apply to our form for***
![formValidationRules](/images/FormikValidationRules.png)
What formik does is let you define a validation function, and that validation function needs to be assigned to a property called validate in the object that we pass to the useFormik hook. This again just like the onSubmit property automaticaly recieves the values object as its argument. This validate function is a function that must satisfy some condition for formik to work as intended
```
const formik = useFormik({
	initialValue: {
		name: '',
		email: '',
		channel: '',
	},
	onSubmit: values => {
		console.log("form data", values);
	},
	validate: values => {
		// recieves values object as its objects
		let errors = {}
		
		// form conditions
		// if name is empty
		if(!values.name) {
			errors.name = "required"
		}
		
		if(!values.email) {
			errors.email = "required"
		} else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(values.email)) {
			errors.email = 'Invalid email format'
		}
		
		if(!values.channel) {
			errors.channel = "Required"
		}
		
		return errors;
	}
})
```
1. The first condition is that this function must return an object. 
2. The second condition is that the keys for this objects should be similar to that of the values object
	example : values.name, values.email, values.channel >< errors.name, errors.email, erros.channel

	these keys will corresspond to the name attribute for the three form fields
3. The third condition is that the value of these keys should be a string indicating what the error message should be for that field
	for example: errors.name = "This field is required"
	
**Refactoring the useFormik hook code**
```
const initialValues = {
  name: "",
  email: "",
  channel: ""
};

const onSubmit = (values) => {
  console.log("form data", values);
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.channel) {
    errors.channel = "Required";
  }

  return errors;
};

const YoutubeForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
});
```

## Displaying error messages
if we check
```
	console.log("form errors", formik.errors);
```
**ON PAGE LOAD** its an empty object
![formikErrors](/images/FormikErrors.png)
But as soon as we put some values in any of the fields we are presented with the errors we specified erlier
![formikErrorObj](/images/FormikErrorObj.png)

## Rendering Error messages on the UI
```
// render error message if email is empty
          {formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}

```

## Visited Fields
most of the time we only want to show a fields error message after our user is done typing in that field 
Now, the question is how do we keep track of the fields the user has interacted with. In simpler terms how do we keep track of the visited fields in our form, well that is where formik comes to our help
the answer is to add ***onBlur*** prop on the form's input element and to this prop we pass in ***formik.handleBlur*** which is a helper method we get from the formik constant
```
<input
	type="text"
	id="name"
	name="name"
	onChange={formik.handleChange}
	onBlur={formik.handleBlur}
	value={formik.values.name}
/>
```
but where does formik store that information. It stores it in an object called touched and the object is the same shape as ***errors*** 
similar to *formik.values* and *formik.errors* we also have **formik.touched**
```
console.log("visited", formik.touched);
```
![visitedFieldsOnLoad](/images/VisitedFields.png)
on page load its an empty object, but once we visit any field it will give us a boolean value of that field if visited its true else empty/false
![visitedFieldsOnVisit](/images/VisitedFieldsObj.png)
**We can use this information to improve our error rendering ux**
```
// we can update our error rendering condition 
{formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
```

## Schema validation with Yup
**We need to install the yup library to use yup**
***yup is used for object schema validation***
```
npm install yup
```

#### using yup
* **Step 1:** Create a validation schema
```
import * as yup from "yup"

const validationSchema = Yup.object({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email format').required('required'),
	channel: Yup.string().required('Required');
})
```
* **Step 2** pass this schema into our useFormik hook
```
const YoutubeForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
	// validate
});
```
**To know what to write as the validation rule we need to go through the yup library**
***Instead of writing our own custom validate function we can go with validation schema***

#### getFieldProps("name") helper method
replaces onBlur, onClick, and values fields with {...formik.getFieldProps('name"')} to get the same effect

## Formik Components
1. Formik
2. Form
3. Field
4. ErrorMessage

#### * Formik Component
The Formik component is a replacement of the useFormik hook, the argument which we pass to useFormik as an object will be passed in as props to the formik component
Step 1: remove useFormik and replace with Formik in import
```
import { Formik } from "formik";
```
Step 2: remove call to useFormik() hook
Step 3: wrap entire form with this Formik component
```
<Formik>
	<form>
		<label>Name</label>
		<input />
	<form>
</Formik>
```
Step 4: Pass in the different props to the formik componet these are the same we defined while calling the useFormik hook
```
<Formik
	initalValues={initialValues}
	validationSchema={validationSchema}
	onSubmit={onSubmit}
>
	<form>
		<label>Name</label>
		<input />
	<form>
</Formik>
```

#### * Form Component
step 1: import Form from formik
```
import {Fromik, Form} from "formik";
```

step 2: replace the html form element with the Form component
```
<Formik>
	<Form>			// automatically hooks into formiks onSubmit method to perform submit action
	</Form>
</Formik>
```
#### * Field Component
step 1: import Field from formik
```
import {Formik, Form, Field} from "formik"
```
step 2: replace all input tag with Field component
```
<Formik>
	<Form>			// automatically hooks into formiks onSubmit method to perform submit action
		<Field>
		<Field>
	</Form>
</Formik>
```
step 3: remove all {...formik.getFieldProps("name")} helper method from the Field component as it doesn't need it

#### * ErrorMessages Component
step 1: import ErrorMessage component from formik
```
import {Formik, Form, Field, ErrorMessage} from "formik"

```
step 2: replace the block of code rendering the error message with the ErrorMessage component
step 3: pass in a name prop which is equal to the name attribute on the Field component
```
<Formik>
	<Form>			// automatically hooks into formiks onSubmit method to perform submit action
		<Field>
			<ErrorMessage name="name"/>
		<Field>
			<ErrorMessage name="email"/>
	</Form>
</Formik>
```
