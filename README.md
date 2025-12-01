# Seesaw Simulation using HTML, CSS, JS

## Project Description:
This project is an interactive online simulation of realistic seesaw that users can experience with random different weights and placements to see the torque differences and rotation between before and after situation.

**Demo Link:** [Click Here to see Demo](https://atakanakdogann.github.io/seesaw-purejs-project/)

## Features and Architecture:
1. Pure JS: There is no external libraries or tools used within this project. Main focus was about DOM Manipulation and logic

2. Physics Engine: I used Weight x Distance formula to obtain Torque and find the tilt angle.

3. Weight Placing: There is some trigonometric calculations to ifnd exact point of user clicks works same in every angle plank became.

4. Users can see the history and informations of weight drops. The information says the location of the placement, side and amount of the weight.

5. Local Storage: To save and restore progress when page is reloaded, Local Storage is used.

## Thought Process:
In the main script of the project, i used `render` function to create/update visual every time a new object dropped. In render() logic, every time looks for all objects and it creates weight-object div for that and html texts etc. are set. Local Store set operation also handled here. 

There was important bonus part in the Requirements and also in example project that user should see the next weight will be dropped and i added this utility with set ready at the end of the render function.

Balance Calculation made in the beginning of render function using `updateBalance` function. There is formula provided in the PDF so I didnt made any changes and used that. Using torques calculated, (rightTorque - leftTorque)/10 gave the exact result and if its over maxAngle which is 30 degree, it is set to 30 degree.

Plank Event Listener kept track of the user interactions whole application. It is not alowed to click and get response outside the Plank Box. For doing that, there is trigonometric calculation using Math.sin and Math.cos of angle of plank multiplied by click locations. 

After find the place of weight, new object pushed into object list.

Another Bonus was the reset button. Reset button basically frees the object list and cleans Local Storage. Also stats about left and right weight also becomes 0.


## AI Usage:

There is no AI Usage in the main core of the project. All the algorithmic decisions, trigonometric calculations, User Interactions and Log Management done by myself. 

Single usage of AI in the project scope was Styling. There is some CSS Styling updates Gemini done for me to get a better visualization.
