window.onload = () => {
    const baseUrl ="http://18.223.0.183:8000" 

    const doFetch = async (url) => {
        const result = await fetch(url)
        const resultJson = await result.json()
        return resultJson
      }

    const getCustomerCount = async () => {
        const url = `${baseUrl}/customers`
        const fetchResult = await doFetch(url)
        const customers = fetchResult.customers
        console.log(customers.length)
        
        // Generate options for the user dropdown dynamically
        for (let i = 1; i <= customers.length; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            userSelect.appendChild(option);
        }
      }

    getCustomerCount()
  
    const invBtn = document.querySelector("#invBtn")
    const custBtn = document.querySelector("#custBtn")
    const userSelect = document.querySelector("#userSelect")
    const userContainer = document.querySelector("#userContainer")
  
    const getRentals = async () => {
      const url = `${baseUrl}/inventory`
      const fetchResult = await doFetch(url)
      const rentals = fetchResult.rentals
      rentals.forEach( r => createHtmlRental(r))
    }

    const getCustomers = async () => {
        const url = `${baseUrl}/customers`
        const fetchResult = await doFetch(url)
        const customers = fetchResult.customers
        console.log(customers.length)
        customers.forEach( c => createHtmlCustomer(c))
      }
  
    const getCustomerRentalInfo = async (id) => {
      const url = `${baseUrl}/customers/${id}` 
      const fetchResult = await doFetch(url)
      const rentals = fetchResult.rentals
      createHtmlCustomerRental(rentals)
    }
  
    const removeInfo = () => {
      while(userContainer.firstChild) {
        userContainer.removeChild(userContainer.firstChild)
      }
    }
  
    const createHtmlRental = (rental) => {
      const div = document.createElement("div")
      const h3 = document.createElement("h3")
      const p1 = document.createElement("p")
      const p2 = document.createElement("p")
  
      h3.innerText = `ID: ${rental[0]}`
      p1.innerText = `Title: ${rental[1]}`
      p2.innerText = `Copies Available: ${rental[2]}`
  
      div.appendChild(h3)
      div.appendChild(p1)
      div.appendChild(p2)
  
      div.className = "item"
  
      userContainer.appendChild(div)
    }

    const createHtmlCustomerRental = (rental) => {
        const div = document.createElement("div")
        const h3 = document.createElement("h3")
    
        h3.innerText = `Title: ${rental}`
    
        div.appendChild(h3)
    
        div.className = "item"
    
        userContainer.appendChild(div)
      }

    const createHtmlCustomer = (customer) => {
        const div = document.createElement("div")
        const h3 = document.createElement("h3")
        const p1 = document.createElement("p")
        const p2 = document.createElement("p")
    
        h3.innerText = `ID: ${customer[0]}`
        p1.innerText = `Name: ${customer[1]} ${customer[2]}`
        p2.innerText = `Account Type: ${customer[3]}`
    
        div.appendChild(h3)
        div.appendChild(p1)
        div.appendChild(p2)
    
        div.className = "item"
    
        userContainer.appendChild(div)
      }
  
  
    userSelect.addEventListener("change" ,(e) => {
        removeInfo()
        getCustomerRentalInfo(e.target.value)
      })
    
    invBtn.addEventListener("click" ,() => {
        removeInfo()
        getRentals()
      })

    custBtn.addEventListener("click" ,() => {
        removeInfo()
        getCustomers()
      })

  }