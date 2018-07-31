export const votes =(input)=> {
    let up;
    let down;

    const upOnly = input.match(/^(\d+) votes up$/);

    if (upOnly) {
        up = Number(upOnly[1]);
        down = 0
    } else {
        up = Number(input.match(/(\d+) ↑/)[1]);
        down = Number(input.match(/(\d+) ↓/)[1]);
    }

    return {up: up, down: down}
};