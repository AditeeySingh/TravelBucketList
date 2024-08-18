document.addEventListener('DOMContentLoaded', () => {
    const destinationForm = document.getElementById('destinationForm');
    const destinationName = document.getElementById('destinationName');
    const destinationNotes = document.getElementById('destinationNotes');
    const visitedCheckbox = document.getElementById('visitedCheckbox');
    const bucketList = document.getElementById('bucketList');

    const loadDestinations = () => {
        const destinations = JSON.parse(localStorage.getItem('destinations')) || [];
        bucketList.innerHTML = '';
        destinations.forEach((destination, index) => {
            addDestinationToList(destination, index);
        });
    };

    const saveDestinations = (destinations) => {
        localStorage.setItem('destinations', JSON.stringify(destinations));
    };

    const addDestinationToList = (destination, index) => {
        const div = document.createElement('div');
        div.className = `destination${destination.visited ? ' visited' : ''}`;
        div.innerHTML = `
            <h3>${destination.name}</h3>
            <p>${destination.notes}</p>
            <button onclick="toggleVisited(${index})">${destination.visited ? 'Mark as Unvisited' : 'Mark as Visited'}</button>
            <button onclick="deleteDestination(${index})">Delete</button>
        `;
        bucketList.appendChild(div);
    };

    destinationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = destinationName.value;
        const notes = destinationNotes.value;
        const visited = visitedCheckbox.checked;

        const newDestination = { name, notes, visited };
        
        const destinations = JSON.parse(localStorage.getItem('destinations')) || [];
        destinations.push(newDestination);
        saveDestinations(destinations);

        addDestinationToList(newDestination, destinations.length - 1);

      
        destinationName.value = '';
        destinationNotes.value = '';
        visitedCheckbox.checked = false;
    });

    
    window.toggleVisited = (index) => {
        const destinations = JSON.parse(localStorage.getItem('destinations'));
        destinations[index].visited = !destinations[index].visited;
        saveDestinations(destinations);
        loadDestinations();
    };

 
    window.deleteDestination = (index) => {
        let destinations = JSON.parse(localStorage.getItem('destinations'));
        destinations = destinations.filter((_, i) => i !== index);
        saveDestinations(destinations);
        loadDestinations();
    };

  
    loadDestinations();
});
