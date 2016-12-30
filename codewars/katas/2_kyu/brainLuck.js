// Inspired from real-world Brainf**k, we want to create an interpreter of that language which will support the following instructions (the machine memory or 'data' should behave like a potentially infinite array of bytes, initialized to 0):

// > increment the data pointer (to point to the next cell to the right).
// < decrement the data pointer (to point to the next cell to the left).
// + increment (increase by one, truncate overflow: 255 + 1 = 0) the byte at the data pointer.
// - decrement (decrease by one, treat as unsigned byte: 0 - 1 = 255 ) the byte at the data pointer.
// . output the byte at the data pointer.
// , accept one byte of input, storing its value in the byte at the data pointer.
// [ if the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command.
// ] if the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command.
// The function will take in input...

// the program code, a string with the sequence of machine instructions,
// the program input, a string, eventually empty, that will be interpreted as an array of bytes using each character's ASCII code and will be consumed by the , instruction
// ... and will return ...

// the output of the interpreted code (always as a string), produced by the . instruction.

// MY SOLUTION
function brainLuck(code, input) {
  let stack_memory = [], machine_memory = [], cache = {}, output = '';
  code = code.split('');

  for (let i = 0; i < code.length; i++) {
    if (code[i] == ']') {
      while (stack_memory.length > 0 && stack_memory[stack_memory.length-1][1] != '[')
        stack_memory.pop();
      let usage = stack_memory.pop();
      cache[i] = usage[0];
      cache[usage[0]] = i;
    } else {
      stack_memory.push([i, code[i]]);
    }
  }

  let ind = 0;
  input = input.split('');
  for (let i = 0; i < code.length; i++) {
    while (ind >= machine_memory.length)
      machine_memory.push(0);
    if (code[i] == ',')
      machine_memory[ind] = input.shift().charCodeAt();
    else if (code[i] == '>')
      ind ++;
    else if (code[i] == '<')
      ind --;
    else if (code[i] == '+')
      machine_memory[ind] = machine_memory[ind] == 255 ? 0 : machine_memory[ind] + 1;
    else if (code[i] == '-')
      machine_memory[ind] = machine_memory[ind] === 0 ? 255 : machine_memory[ind] - 1;
    else if (code[i] == '.')
      output += String.fromCharCode(machine_memory[ind]);
    else if (code[i] == '[') {
      if (machine_memory[ind] === 0)
        i = cache[i];
    } else if (code[i] == ']') {
      if (machine_memory[ind] !== 0)
        i = cache[i];
    }
  }

  return output;
}
