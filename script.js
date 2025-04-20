// Fetch the JSON data (assuming the file is saved as "day1_python_fundamentals.json")
fetch('day1_python_fundamentals.json')
    .then(response => response.json())
    .then(data => {
        // Call the function to populate the page content
        populateMainContent(data);
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });

// Function to populate the page with data
function populateMainContent(data) {
    const studyBox = document.getElementById("study-box");
    const examBox = document.getElementById("exam-box");
    const resultBox = document.getElementById("result-box");

    // Displaying the first module's description in the "Let's Study" box
    studyBox.innerHTML = `
        <h3>Let's Study</h3>
        <p>${data.modules[0].description}</p>
    `;

    // "Ready for Exam" box with a link to an exam page (example link)
    examBox.innerHTML = `
        <h3>Ready for Exam</h3>
        <p>Get ready for the exam on ${data.title}.</p>
        <a href="exam_page.html" class="pointer" target="_blank">Go to Exam</a> <!-- Link to the exam page -->
    `;

    // "Result" box with content about tracking results
    resultBox.innerHTML = `
        <h3>Result</h3>
        <p>Track your performance after taking the exam.</p>
    `;

    // Optionally, you can loop through exercises and examples and display them dynamically as well
    let exercisesContent = "<ul>";
    data.modules.forEach(module => {
        module.exercises.forEach(exercise => {
            exercisesContent += `<li>${exercise}</li>`;
        });
    });
    exercisesContent += "</ul>";

    resultBox.innerHTML += `
        <h4>Exercises for Review</h4>
        ${exercisesContent}
    `;

    // Dynamically add study material content (Examples and Exercises) from JSON
    let studyContent = "<h4>Examples</h4>";
    data.modules.forEach(module => {
        studyContent += `
            <h5>${module.title}</h5>
            <ul>
                ${module.examples.map(example => `<li>${example}</li>`).join('')}
            </ul>
        `;
    });

    studyBox.innerHTML += studyContent;
}
