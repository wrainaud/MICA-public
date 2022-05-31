const mysql = require('mysql');
const cors = require('cors');

exports.handler = async (event, context) => {
  
  const db = mysql.createConnection({
      host     : process.env.dbhost,
      user     : process.env.dbuser,
      password : process.env.dbpassword,
      database : process.env.dbname
  });
  
  db.connect();
  
  const path = event.path;
  console.log(path);
  
  let id = undefined;
  if(event.pathParameters != null){
    id = event.pathParameters.id;
  }

  const headers = { 
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "content-type"
  };
  
  let resp = {
    "statusCode": 400,
    "headers": headers,
    "body": JSON.stringify({
    "message": "There was an error"
    })
  };
  
  
//----------------- Buildings API -----------------//
    if (path === "/building") {
        switch (event.httpMethod) {
            case "GET":
            try {
                let getResult = await dbQuery(db, "SELECT * FROM micadb.Buildings");
                if (getResult === undefined) {
                    getResult = {
                        "message" : "Body cannot be empty"
                    }
                    console.log("Table is empty");
                }
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify(getResult)
                }
            } catch(err) {
                console.log(err);
            }
            break;
            case "POST":
            try {
                let body = JSON.parse(event.body);
                let postResult = await dbQuery(db, "INSERT INTO Buildings (building_name, building_abv) VALUES (?, ?)", [body.building_name, body.building_abv]);
                // console.log("this building was passed up", body);
                if(body != undefined) {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Building was created"
                    })
                };
                } else {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Post body cannot be empty"
                    })
                };
                }
            } catch(err) {
                console.log(err);
            }
            break;
            default:
                console.log(`Unsupported method "${event.httpMethod}"`);
        }
    } 
//----------------- Buildings ID Param API -----------------//
    else if (path === "/building/" + id) {
        switch (event.httpMethod) {
            case "GET":
            // console.log("hi from parameter");
            try {
                let getResult = await dbQuery(db, "SELECT * FROM micadb.Buildings WHERE id_building = ?", [id]);
                if (getResult === undefined) {
                    getResult = {
                        "message" : "Body cannot be empty"
                    }
                    console.log("Table is empty");
                }
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify(getResult)
                }
            } catch(err) {
                console.log(err);
            }
            break;
            case "DELETE":
            try {
                let body = JSON.parse(event.body);
                let delResult = await dbQuery(db, "DELETE FROM Buildings WHERE id_building = ?", [id]);
                if(body != undefined) {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Building was deleted"
                    })
                };
                } else {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Post body cannot be empty"
                    })
                    };
                }
            } catch(err) {
                console.log(err);
            }
            break;
            case "PUT":
              try {
                let body = JSON.parse(event.body);
                let putResult = await dbQuery(db, "UPDATE Buildings SET building_name = ?, building_abv = ? WHERE id_building = ?", [body.building_name, body.building_abv, id]);
                // console.log("this report was passed up", body);
                if(body != undefined) {
                  resp = {
                    "statusCode": 200,
                      "headers": headers,
                    "body": JSON.stringify({
                      "message": "Building was updated"
                    })
                  };
                } else {
                  resp = {
                    "statusCode": 200,
                      "headers": headers,
                    "body": JSON.stringify({
                      "message": "Body cannot be empty"
                    })
                  };
                }
              } catch(err) {
                console.log(err);
              }
            break;
            default:
                console.log(`Unsupported method "${event.httpMethod}"`);
        }
    }
//----------------- Room API -----------------//
    else if (path === "/room"){
        switch (event.httpMethod) {
            case "GET":
            try {
                let getResult = await dbQuery(db, "SELECT * FROM micadb.Rooms LEFT JOIN micadb.Buildings ON Rooms.Buildings_id_building = Buildings.id_building WHERE Rooms.id_room IS NOT NULL;");
                if (getResult === undefined) {
                    getResult = {
                        "message" : "Body cannot be empty"
                    }
                    console.log("Table is empty");
                }
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify(getResult)
                }
            } catch(err) {
                console.log(err);
            } 
            break;
            case "POST":
            try {
                let body = JSON.parse(event.body);
                let postResult = await dbQuery(db, "INSERT INTO Rooms (room_number, Buildings_id_building) VALUES (?, ?)", [body.room_number, body.Buildings_id_building]);
                // console.log("this was passed up", body);
                if(body != undefined) {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Room was created"
                    })
                };
                } else {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Post body cannot be empty"
                    })
                };
                }
            } catch(err) {
                console.log(err);
            }
            break;
            default:
                console.log(`Unsupported method "${event.httpMethod}"`);
        }
    }
//----------------- Rooms ID Param API -----------------//
    else if (path === "/room/" + id) {
        switch (event.httpMethod) {
            case "GET":
            // console.log("hi from parameter");
            try {
                let getResult = await dbQuery(db, "SELECT * FROM micadb.Rooms WHERE id_room = ?", [id]);
                if (getResult === undefined) {
                    getResult = {
                        "message" : "Body cannot be empty"
                    }
                    console.log("Table is empty");
                }
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify(getResult)
                }
            } catch(err) {
                console.log(err);
            }
            break;
            case "DELETE":
            try {
                let body = JSON.parse(event.body);
                let delResult = await dbQuery(db, "DELETE FROM Rooms WHERE id_room = ?", [id]);
                if(body != undefined) {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Room was deleted"
                    })
                };
                } else {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Body cannot be empty"
                    })
                    };
                }
            } catch(err) {
                console.log(err);
            }
            break;
            case "PUT":
              try {
                let body = JSON.parse(event.body);
                let putResult = await dbQuery(db, "UPDATE Rooms SET room_number = ?, Buildings_id_building = ?, room_name = ? WHERE id_room = ?", [body.room_number, body.Buildings_id_building, body.room_name, id]);
                // console.log("this report was passed up", body);
                if(body != undefined) {
                  resp = {
                    "statusCode": 200,
                      "headers": headers,
                    "body": JSON.stringify({
                      "message": "Room was updated"
                    })
                  };
                } else {
                  resp = {
                    "statusCode": 200,
                      "headers": headers,
                    "body": JSON.stringify({
                      "message": "Body cannot be empty"
                    })
                  };
                }
              } catch(err) {
                console.log(err);
              }
            break;
            default:
                console.log(`Unsupported method "${event.httpMethod}"`);
        }
    }    
//----------------- Room Building ID Param API -----------------//
    else if (path === "/room/bybuilding/" + id) {
        switch (event.httpMethod) {
            case "GET":
            // console.log("hi from parameter");
            try {
                let getResult = await dbQuery(db, "SELECT * FROM micadb.Rooms WHERE Buildings_id_building = ?", [id]);
                if (getResult === undefined) {
                    getResult = {
                        "message" : "Body cannot be empty"
                    }
                    console.log("Table is empty");
                }
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify(getResult)
                }
            } catch(err) {
                console.log(err);
            }
            break;
            default:
                console.log(`Unsupported method "${event.httpMethod}"`);
        }
    }    
//----------------- Equipment API -----------------//
    else if (path === "/equipment"){
        switch (event.httpMethod) {
            case "GET":
            try {
                let getResult = await dbQuery(db, "SELECT * FROM micadb.Equipment LEFT JOIN micadb.Rooms ON Equipment.Rooms_id_room = Rooms.id_room LEFT JOIN micadb.Buildings ON Rooms.Buildings_id_building = Buildings.id_building ");
                if (getResult === undefined) {
                    getResult = {
                        "message" : "Body cannot be empty"
                    }
                    console.log("Table is empty");
                }
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify(getResult)
                }
            } catch(err) {
                console.log(err);
            } 
            break;
            case "POST":
            try {
                let body = JSON.parse(event.body);
                let postResult = await dbQuery(db, "INSERT INTO Equipment (equipment_name, equipment_type, mu_equipment_tag, manufacturer, Rooms_id_room) VALUES (?, ?, ?, ?, ?)", [body.equipment_name, body.equipment_type, body.mu_equipment_tag, body.manufacturer, body.Rooms_id_room]);
                // console.log("this was passed up", body);
                if(body != undefined) {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Equipment was created"
                    })
                };
                } else {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Post body cannot be empty"
                    })
                };
                }
            } catch(err) {
                console.log(err);
            }
            break;
            default:
                console.log(`Unsupported method "${event.httpMethod}"`);
        }
    }
//----------------- Equipment ID Param API -----------------//
    else if (path === "/equipment/" + id) {
        switch (event.httpMethod) {
            case "GET":
            // console.log("hi from parameter");
            try {
                let getResult = await dbQuery(db, "SELECT * FROM micadb.Equipment WHERE id_equipment = ?", [id]);
                if (getResult === undefined) {
                    getResult = {
                        "message" : "Body cannot be empty"
                    }
                    console.log("Table is empty");
                }
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify(getResult)
                }
            } catch(err) {
                console.log(err);
            }
            break;
            case "DELETE":
            try {
                let body = JSON.parse(event.body);
                let delResult = await dbQuery(db, "DELETE FROM micadb.Equipment WHERE id_equipment = ?", [id]);
                if(body != undefined) {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Equipment was deleted"
                    })
                };
                } else {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Post body cannot be empty"
                    })
                };
                }
            } catch(err) {
                console.log(err);
            }
            case "PUT":
              try {
                let body = JSON.parse(event.body);
                //TODO: only updates status, notes, check_date -- if fields are empty it would replace
                let putResult = await dbQuery(db, "UPDATE Equipment SET equipment_name = ?, equipment_type = ?, manufacturer = ?, Rooms_id_room = ?, mu_equipment_tag = ? WHERE id_equipment = ?", [body.equipment_name, body.equipment_type, body.manufacturer, body.Rooms_id_room, body.mu_equipment_tag, id]);
                // console.log("this equipment was passed up", body);
                if(body != undefined) {
                  resp = {
                    "statusCode": 200,
                      "headers": headers,
                    "body": JSON.stringify({
                      "message": "Equipment was updated"
                    })
                  };
                } else {
                  resp = {
                    "statusCode": 200,
                      "headers": headers,
                    "body": JSON.stringify({
                      "message": "Put body cannot be empty"
                    })
                  };
                }
              } catch(err) {
                console.log(err);
              }
            break;
            default:
                console.log(`Unsupported method "${event.httpMethod}"`);
        }
    }
//----------------- Equipment Room ID Param API -----------------//
    else if (path === "/equipment/byRoom/" + id) {
        switch (event.httpMethod) {
            case "GET":
            try {
                let getResult = await dbQuery(db, "SELECT * FROM micadb.Equipment WHERE Rooms_id_room = ?", [id]);
                if (getResult === undefined) {
                    getResult = {
                        "message" : "Body cannot be empty"
                    }
                    console.log("Table is empty");
                }
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify(getResult)
                }
            } catch(err) {
                console.log(err);
            }
            break;
            default:
                console.log(`Unsupported method "${event.httpMethod}"`);
        }
    }
//----------------- Report API -----------------//
    else if (path === "/report"){
        switch (event.httpMethod) {
            case "GET":
            try {
                let getResult = await dbQuery(db, "SELECT Reports.*, Equipment.*, Rooms.*, Buildings.* FROM Reports INNER JOIN Equipment ON Equipment_id_equipment = Equipment.id_equipment INNER JOIN Rooms ON Rooms.id_room = Equipment.Rooms_id_room INNER JOIN Buildings ON Rooms.Buildings_id_building = Buildings.id_building ORDER BY check_date DESC;");
                if (getResult === undefined) {
                    getResult = {
                        "message" : "Body cannot be empty"
                    }
                    console.log("Table is empty");
                }
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify(getResult)
                }
            } catch(err) {
                console.log(err);
            }
            break;
            case "POST":
            try {
                let body = JSON.parse(event.body);
                let postResult = await dbQuery(db, "INSERT INTO Reports (status, notes, user, check_date, Equipment_id_equipment) VALUES (?, ?, ?, CURRENT_TIMESTAMP(), ?)", [body.stat, body.notes, body.user, body.Equipment_id_equipment]);
                console.log("this was passed up", body);
                if(body != undefined) {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Report was created"
                    })
                };
                } else {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Post body cannot be empty"
                    })
                };
                }
            } catch(err) {
                console.log(err);
            }
            break;
            default:
                console.log(`Unsupported method "${event.httpMethod}"`);
        }
    }
//----------------- Report ID Param API -----------------//
    else if (path === "/report/" + id) {
        switch (event.httpMethod) {
            case "GET":
            // console.log("hi from parameter");
            try {
                let getResult = await dbQuery(db, "SELECT * FROM micadb.Rooms WHERE id_reports = ?", [id]);
                if (getResult === undefined) {
                    getResult = {
                        "message" : "Body cannot be empty"
                    }
                    console.log("Table is empty");
                }
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify(getResult)
                }
            } catch(err) {
                console.log(err);
            }
            break;
            case "DELETE":
            try {
                let body = JSON.parse(event.body);
                let delResult = await dbQuery(db, "DELETE FROM micadb.Reports WHERE id_reports = ?", [id]);
                if(body != undefined) {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Report was deleted"
                    })
                };
                } else {
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify({
                    "message": "Post body cannot be empty"
                    })
                };
                }
            } catch(err) {
                console.log(err);
            }
            case "PUT":
              try {
                let body = JSON.parse(event.body);
                let putResult = await dbQuery(db, "UPDATE micadb.Reports SET status = ?, notes = ?, user = ?, check_date = current_timestamp(), Equipment_id_equipment = ? WHERE id_reports", [body.stat, body.notes, body.user, body.Equipment_id_equipment, id]);
                // console.log("this report was passed up", body);
                if(body != undefined) {
                  resp = {
                    "statusCode": 200,
                      "headers": headers,
                    "body": JSON.stringify({
                      "message": "Report was updated"
                    })
                  };
                } else {
                  resp = {
                    "statusCode": 200,
                      "headers": headers,
                    "body": JSON.stringify({
                      "message": "Body cannot be empty"
                    })
                  };
                }
              } catch(err) {
                console.log(err);
              }
            break;
            default:
                console.log(`Unsupported method "${event.httpMethod}"`);
        }
    }
//----------------- Report Recent 3 API -----------------//
    else if (path === "/report/recent") {
        switch (event.httpMethod) {
            case "GET":
            // console.log("hi from parameter");
            try {
                let getResult = await dbQuery(db, "SELECT Reports.*, Equipment.*, Rooms.*, Buildings.* FROM Reports INNER JOIN Equipment ON Equipment_id_equipment = Equipment.id_equipment INNER JOIN Rooms ON Rooms.id_room = Equipment.Rooms_id_room INNER JOIN Buildings ON Rooms.Buildings_id_building = Buildings.id_building ORDER BY check_date DESC LIMIT 3;");
                if (getResult === undefined) {
                    getResult = {
                        "message" : "Body cannot be empty"
                    }
                    console.log("Table is empty");
                }
                resp = {
                    "statusCode": 200,
                    "headers": headers,
                    "body": JSON.stringify(getResult)
                }
            } catch(err) {
                console.log(err);
            }
            break;
            default:
                console.log(`Unsupported method "${event.httpMethod}"`);
        }
    }
  
    console.log(await dbEnd(db));
    // await dbEnd(db);
    return resp;
};

//returns query promise
const dbQuery = (conn, ...params) => {
  return new Promise((resolve, reject) => {
    conn.query(...params, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

//end db connection in promise
const dbEnd = (conn) => {
  return new Promise((resolve, reject) => {
    conn.end((err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};