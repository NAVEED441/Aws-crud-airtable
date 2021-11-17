exports.handler = async (event) => {
  const Airtable = require('airtable');
  const base = new Airtable({apiKey: 'keyi3oqoBhGwlchB0'}).base('appXrd8WNG9O4QqKq');
    const method = event.requestContext.http.method;
    console.log(event)
    console.log(event.requestContext.http.method)
     try {
    switch (method) {
      case 'GET':
        const data = () => {
          return new Promise((resolve, reject) => {
            const allCases = [];
        
            base("Table 1")
              .select({})
              .eachPage(
                function page(records, fetchNextPage) {
                  records.forEach(record => {
                    if (record.fields.hasOwnProperty('Name')) {
                      allCases.push(record.fields);
                    }
                    
                  });
                  fetchNextPage();
                },
                function done(err) {
                  if (err) {
                    reject(err);
                  } else {
                      console.log(allCases)
                    resolve(allCases);
                  }
                }
              );
          });
        };
        
        const result = await data();
        return result
      
     
      case "POST":
        const dta = JSON.parse(event.body)
        const post  = await base('Table 1').create([
          {
            "fields": {
              "Name": dta.Name,
              "Address": dta.Address,
              "MobileNumber": dta.MobileNumber
              
            }
          }
         
        ]);
        return post;
        
      case "PUT":
        const put =   await base('Table 1').update([
          {
            "id": JSON.parse(event.body).id,
            "fields": {
              "Name": JSON.parse(event.body).Name,
              "Address":JSON.parse(event.body).Address,
              "MobileNumber": JSON.parse(event.body).Number
           
            }
          }
        ]);
           
            return put;
      
      case "DELETE":
        const dlt = await base('Table 1').destroy(['recDQY8o4J887fDlp']);
        const response = {
          statusCode: 200,
          body: JSON.stringify(dlt),
         };
         return response
      
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
   
    
  } 


    const response = {
        statusCode: 200,
        body: JSON.stringify(),
    };
    return method;
};
