import React, { useState, useEffect } from 'react';

import { ListShortLinks } from './components/list-short-links';
import './App.css';
import { Form } from './components/form';
import { Button } from './components/button';
import { Header } from './components/header';


function App() {

  const [shortLinks, setShortLinks] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [currentAction, setCurrentAction] = useState('');

  useEffect(() => {
    fetch('/shortlinks/').then((res) => res.json()).then((data) => {
        setShortLinks(data);
      });
  }, []);

  function handleAddSlug() {
    setCurrentAction('add');

    fetch('/shortlinks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(formData)
    })
    .catch(err => {
      setError(err);  
    });
    
    setShortLinks([formData, ...shortLinks]);

  }

  function handleEditSlug() {

    setCurrentAction("edit")

    fetch(`/shortlinks/${formData.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(formData)
    })
    .then(json => json.json())
    .then(data => {
        setShortLinks([data, ...shortLinks])
    })
    .catch(err => {
      //setError(err)
      console.log(err)
    })
  }

  return (


    <div className="d-flex flex-column overflow-y-a h-100">
      <Header />
      <section className="text-white h-100">
        <div className="container-fluid h-100">
          <div className="row align-items-center h-100">
            <div className="col-12 col-md-7 col-lg-5 col-xl-4 my-3 my-lg-0 mb-3">

              <div className="heroHome-2__left create-form">
                <div className="card rounded-10 bg-g-1 text-dark mb-0">
                  <div className="card-body p-2 p-sm-3">
                    <div data-v-154c538c="" role="dialog">
                    <h1>{error ? error[0]: console.log(error)}</h1>

                      <form data-v-154c538c=""  >
                        <Form handleChange={setFormData} formData={formData} currentAction={currentAction} />


                        <Button onClick={handleAddSlug} text="Make SmartShortlink!" />
                        <Button onClick={handleEditSlug} text="Edit Shortlinks" />

                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ListShortLinks shortlinks={shortLinks} />

      </section>
    </div>
  )
}



export default App;
