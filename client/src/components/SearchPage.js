import Row from "react-bootstrap/esm/Row";
import "./SearchPage.css";
// import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import TopNav from "./Navbar";

// function App() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [availabilityFilter, setAvailabilityFilter] = useState("");

//   const data = [
//     { name: "VolleyBall", location: "SRSC", availability: "Yes" },
//     { name: "Skating", location: "SRSC", availability: "No" },
//     { name: "FootBall", location: "SRSC", availability: "Yes" },
//     { name: "Tennis", location: "Bill Garet", availability: "Yes" },
//     { name: "BasketBall", location: "Bill Garet", availability: "No" },
//     {
//       name: "TableTennis",
//       location: "SRSC",
//       availability: "No"
//     }
//   ];

//   const filteredData = data.filter((item) => {
//     const nameMatch = item.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const locationMatch = locationFilter
//       ? item.location === locationFilter
//       : true;
//     const availabilityMatch = availabilityFilter
//       ? item.availability === availabilityFilter
//       : true;

//     return nameMatch && locationMatch && availabilityMatch;
//   });

//   return (
//     <div className="bg">
//         <TopNav brandname = 'Events'/>
//         <h2>Events</h2>
//         <Row xs={1} md={3} style={{marginTop: '45vh'}}>
//             <Col style={{align: 'center'}}>
//             <input
//             style={{backgroundColor: 'white', height: '50px'}}
//             type="text"
//             placeholder="Search by name"
//             value={searchTerm}
//             onChange={(event) => setSearchTerm(event.target.value)}
//             />
//             </Col>
//             <Col>
//             <select
//             style={{backgroundColor: 'white', height: '50px'}}
//                 value={locationFilter}
//                 onChange={(event) => setLocationFilter(event.target.value)}
//                 >
//                 <option value="">Filter by location</option>
//                 <option value="SRSC">SRSC</option>
//                 <option value="Bill Garet">Bill Garet</option>
//             </select>
//             </Col>
//             <Col>
//             <select
//             style={{backgroundColor: 'white', height: '50px'}}
//           value={availabilityFilter}
//           onChange={(event) => setAvailabilityFilter(event.target.value)}
//         >
//           <option value="">Filter by availability</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//             </Col>       
//         </Row>
//       <div>
        
//       </div>
//       <div>
//         <h2>Results</h2>
//         <ul style={{alignContent: 'center', color: 'black'}}>
//           {filteredData.map((item, index) => (
//             <li key={index} style={{alignContent: 'center'}}>
//               <p>{item.name}</p>
//               <p>Location: {item.location}</p>
//               <p>Availability: {item.availability}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;

// import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

let baseURL = "http://127.0.0.1:5000/data?";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [nameFilter, setnameFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [capacityFilter, setcapacityFilter] = useState("");

  const [data, setData] = useState(null);

  function setnameFilters(value){
    if (baseURL.indexOf("name=") !== -1) {
      const st="name"+"="+value
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"name="}[^&]*`),
        st
      );
      setnameFilter(value);
      baseURL=updatedBaseURL
    } else {
      setnameFilter(value);
      baseURL=baseURL+"&"+"name"+"="+value;
    }
  }

  function setLocationFilters(value){

    if (baseURL.indexOf("location=") !== -1) {
      const st="location"+"="+value
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"location="}[^&]*`),
        st
      );
      setLocationFilter(value);
      baseURL=updatedBaseURL
    } else {
      setLocationFilter(value);
      baseURL=baseURL+"&"+"location"+"="+value;
    }
  }

  function setcapacityFilters(value){

    if (baseURL.indexOf("capacity=") !== -1) {
      const st="capacity"+"="+value
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"capacity="}[^&]*`),
        st
      );
      setcapacityFilter(value);
      baseURL=updatedBaseURL
    } else {
      setcapacityFilter(value);
      baseURL=baseURL+"&"+"capacity"+"="+value;
    }

  }

  function setSearchTerms(value){

    if (baseURL.indexOf("search_query=") !== -1) {
        const st="search_query"+"="+value
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );
        baseURL=updatedBaseURL
        setSearchTerm(value);
      } else {
        baseURL=baseURL+"&"+"search_query"+"="+value;
        setSearchTerm(value);
      }
      
  }

  console.log(baseURL)

  useEffect(() => {
    axios.get('/data')
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res.data;
        } else {
          throw new Error("Server responded with an error status: " + res.status);
        }
      })
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(handleError);
  }, [nameFilter, locationFilter, capacityFilter, searchTerm]);
  console.log(nameFilter, locationFilter, capacityFilter, searchTerm)

  function handleError(error) {
    console.error("Axios error:", error);
    // handle the error here, e.g. show an error message to the user
  }

  // if (!data) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h2 style={{color:'white'}}>Events</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(event) => setSearchTerms(event.target.value)}
        />
        <select 
          value={nameFilter}
          onChange={(event) => setnameFilters(event.target.value)}
        >
          <option value=""></option>
          <option value="tennis">tennis</option>
          <option value="badminton">badminton</option>
          <option value="football">football</option>
          <option value="basketball">basketball</option>
          <option value="table tennis">table tennis</option>
          <option value="volleyball">volleyball</option>
          <option value="squash">squash</option>
        </select>
        <select
          value={locationFilter}
          onChange={(event) => setLocationFilters(event.target.value)}
        >
          <option value=""></option>
          <option value="srsc">srsc</option>
          <option value="north">north</option>
          <option value="south">south</option>
          <option value="east">east</option>
          <option value="west">west</option>
          <option value="downtown">downtown</option>
        </select>
        <select
          value={capacityFilter}
          onChange={(event) => setcapacityFilters(event.target.value)}
        >
          <option value=""></option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="30">30</option>
        </select>
      </div>
      <div>
        <h2 style={{color:'white'}}>Results</h2>
        <ul>

        {data && (
        data.map((json) => (
          <li key={json._id}>
            <p style={{color:'black'}}>{json.name}</p>
            <p style={{color:'black'}}>{json.location}</p>
            <p style={{color:'black'}}>{json.capacity}</p>
          </li>
        ))
      )}
       {/* : (
       <div>Loading...</div>
       )} */}
        
      
        </ul>
      </div>
    </div>
  );
}

export default App;