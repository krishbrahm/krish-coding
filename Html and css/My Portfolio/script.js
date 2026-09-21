function toggleDark() {
    document.body.classList.toggle('dark');
}

let roles = ['Grade 2 student', 'Young coder', 'Swimmer', 'Math whiz'];
let index = 0;
setInterval(() => {
    document.querySelector('.typing').innerHTML = roles[index];
    index++;
    if (index >= roles.length) {
        index = 0;
    }
}, 2000);

let count = 0;
function like() {
    count++;
    document.getElementById('likes').innerHTML = count;
}

function contact() {
    document.querySelector('.contact').scrollIntoView({
        behavior: "smooth"
    });
}

document.querySelector('.profile button').onclick = function () {
    let text = `KRISH BRAHMANDAM

    Student Portfolio
    
    
    Skills:
    
    Drawing
    Reading
    Coding
    
    
    Achievements:
    
    Won first place in school show
    Piano master
    Coding star`;
    let file = new Blob([text], { type: 'text/plain' });
    let link = document.createElement('a')
    link.href = URL.createObjectURL(file);


    link.download = "Krish_resume.txt";
    link.click();
};

document.getElementById("year").innerHTML = new Date().getFullYear();