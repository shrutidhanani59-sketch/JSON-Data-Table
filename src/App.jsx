import { useEffect, useState } from "react";
import './App.css'

function App() {

  const API = "http://localhost:3000/empolyee";
  const [AllData, setAllData] = useState([]);

  const [currentpage, setCurrentpage] = useState(1);
  const [pageperdata, setPageperdata] = useState(10);

  let totelpage = Math.ceil(AllData.length / pageperdata);

  let lastIndex = currentpage * pageperdata;
  let FirstIndex = lastIndex - pageperdata;

  let currentpageData = AllData.slice(FirstIndex , lastIndex);

  useEffect(() => {
    fetch(API, {
      method: "GET",
      header: {
        "content-type": "application/json"
      }
    }).then((response) => {
      response.json().then((data) => {
        setAllData(data);

      })
    })
  }, [])


  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Employee Data</h2>

        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>EMPLOYEE ID</th>
                <th>Name</th>
                <th>EMAIL</th>
                <th>DEPARTMENT</th>
                <th>POSITION</th>
                <th>SALARY</th>
                <th>CITY</th>
              </tr>
            </thead>

            <tbody>
              {
                currentpageData.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td>{element.id}</td>
                      <td>{element.name}</td>
                      <td>{element.email}</td>
                      <td>{element.department}</td>
                      <td>{element.position}</td>
                      <td>₹{element.salary}</td>
                      <td>{element.city}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center border rounded p-3 bg-light">

          <div className="d-flex align-items-center gap-2">
            <span>Pages per data</span>

            <select className="form-select w-auto" onChange={(e)=>{setPageperdata(e.target.value);
            }}>
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
            </select>
          </div>

          <div>
            <span className="fw-semibold">Page {currentpage} of {totelpage}</span>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={()=>{setCurrentpage(currentpage-1) }} disabled={currentpage==1}>
              Pre
            </button>

            <button className="btn btn-primary" onClick={()=>{setCurrentpage(currentpage+1) }} disabled={currentpage==totelpage}>
              Next
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
