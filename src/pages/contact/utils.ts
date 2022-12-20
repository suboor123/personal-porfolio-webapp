export const remove = (arr: number[], item: number) => {
  const newArr = [...arr];
  newArr.splice(
    newArr.findIndex((i) => i === item),
    1
  );
  return newArr;
};

let newIndex = 0;
export const add = (arr: number[]) => {
  newIndex++;
  return [...arr, newIndex];
};


export const checkErrors = (name: string, email: string, message: string) => {
    let errors = [];

    if(!name || name.trim() === '') {
        errors.push('Name');
    }

    if(!email || email.trim() === '') {
        errors.push('Email')
    }

    if(!message || message.trim() === '') {
        errors.push('Message')
    }

    return {
        hasErrors: errors.length !== 0,
        errors: errors
    }
}