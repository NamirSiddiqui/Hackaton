//listing elements
document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
    event?.preventDefault();

    // type assertation
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillElement = document.getElementById('skill') as HTMLInputElement;
    
    // **
    const usernameElement = document.getElementById("username") as HTMLInputElement

    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillElement && usernameElement) {

        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skill = skillElement.value;
        const username = usernameElement.value;
        const uniquePath = `resumes/${username.replace(/\s+/g, ' ')}_cv.html`
// picture elements
const profilePictureFile = profilePictureInput.files?.[0]
const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
        //create resume output
        const resumeOutput = `
    <h2>Resume</h2>
    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : "" }
    <p><strong>Name:</strong> <span id="edit-name" class="editable"> ${name} </span> </p>
    <p><strong>Email:</strong> <span id="edit-edit" class="editable"> ${email} </span> </p>
    <p><strong>Phone:</strong> <span id="edit-phone" class="editable"> ${phone} </span> </p>

    <h3>Education</h3>
    <p id="edit-education" class="editable">${education}</p>

        <h3>Experience</h3>
    <p id="edit-experience" class="editable">${experience}</p>

        <h3>Skills</h3>
    <p id="edit-skills" class="editable">${skill}</p>`;

    const downloadLink = document.createElement('a')
    downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput)
    downloadLink.download = uniquePath;
    downloadLink.textContent = 'Download Your 2024 Resume'

        const resumeOutputElement = document.getElementById('resumeOutput')
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput
            resumeOutputElement.appendChild(downloadLink)
            makeEditable();
        }
    } else {
        console.error('one or more output elements are missing')
    }
})

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable')
    editableElements.forEach(element => {
        element.addEventListener('click', function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            //replace content
            if (currentElement.tagName === "p" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input')
                input.type = 'text'
                input.value = currentValue
                input.classList.add('editing-input')

                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value
                    currentElement.style.display = 'inline'
                    input.remove();
                })
                currentElement.style.display = 'none'
                currentElement.parentNode?.insertBefore(input, currentElement)
                input.focus()
            }
        })
    })
}