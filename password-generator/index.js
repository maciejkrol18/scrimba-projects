const passwordSpansArray = [
    document.querySelector('.first-password'),
    document.querySelector('.second-password'),
    document.querySelector('.third-password'),
    document.querySelector('.fourth-password')
];

const characterInput = document.querySelector('.character__count__input');
const characterCountSpan = document.querySelector('.character__count__display');

let maxPasswordLength = 0;

const characters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                    '0','1','2','3','4','5','6','7','8','9',
                    '!','#','$','%','&','*','^','(',')','@','#','+','-','[',']'
                    ];

function getCharacterCount() {
    if (characterInput.value > 10 || characterInput.value === "" || characterInput.value === 0) {
        Swal.fire({
            color: 'var(--clr-accent',
            background: 'var(--clr-bg)',
            scrollbarPadding: false,
            heightAuto: false,
            position: 'center',
            icon: 'error',
            title: 'Provide a number lower than or equal to 10',
            showConfirmButton: true,
          })
        characterInput.value = "";
    } else {
        maxPasswordLength = characterInput.value;
        characterInput.value = "";

        Swal.fire({
            color: 'var(--clr-accent',
            background: 'var(--clr-bg)',
            scrollbarPadding: false,
            heightAuto: false,
            position: 'center',
            icon: 'success',
            title: 'Character count successfully applied',
            showConfirmButton: false,
            timer: 1000
        })

        characterCountSpan.textContent = maxPasswordLength;

        renderPasswords();
    }
}

function renderPasswords() {
    if (maxPasswordLength === 0) {
        Swal.fire({
            color: 'var(--clr-accent',
            background: 'var(--clr-bg)',
            scrollbarPadding: false,
            heightAuto: false,
            position: 'bottom-center',
            icon: 'error',
            title: 'Provide the desired character count first',
            showConfirmButton: true,
          })
    } else {
        for (let i=0; i < passwordSpansArray.length; i++) {
            passwordSpansArray[i].textContent = password();
        }
    }
}

function password() {
    let generatedPassword = "";

    for (let j=0; j < maxPasswordLength; j++) {
        let randomIndex = Math.floor(Math.random()*characters.length);
        generatedPassword += characters[randomIndex];
    }

    return generatedPassword;
}