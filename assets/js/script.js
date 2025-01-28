const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value) / 100; // Convertendo centímetros para metros

  if (!isNaN(weight) || !isNaN(height) || weight != 0 || height != 0) {

    weight.addEventListener('input', (event) => {
      let value = event.target.value;
      value = value.replace(/[^0-9.,]/g, ''); // regex para remover oque não é numero ou . ou ,

      value = value.replace(',', '.'); //substitui , por . para padronizar retorno

      if (value) {
          event.target.value = `${parseFloat(value).toFixed(2)} cm`;
      } else {
          event.target.value = ''; // Limpa o campo se o valor for inválido
      }
  });

  weight.addEventListener('blur', (event) => {
      // Remove o "cm" caso o campo fique vazio ao perder o foco
      if (!event.target.value.trim()) {
          event.target.value = '';
      }
  });

    return;

  } 
  else {
    
    alert('Por favor, insira valores válidos para peso e altura.');
    
  }

  const bmi = (weight / (height * height)).toFixed(2);

  const value = document.getElementById('value');
  let description = '';

  value.classList.add('low');
  value.classList.add('normal');
  value.classList.add('high');
  value.classList.add('very-high');
  value.classList.add('extreme');
  

  document.getElementById('infos').classList.remove('hidden');

  if (bmi < 18.5) {
    description = 'Abaixo do peso';
    value.classList.add('low');
    value.classList.remove('normal', 'high', 'very-high', 'extreme');
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    description = 'Peso ideal';
    value.classList.add('normal');
    value.classList.remove('low', 'high', 'very-high', 'extreme');
  } else if (bmi >= 25 && bmi <= 29.9) {
    description = 'Sobrepeso';
    value.classList.add('high');
    value.classList.remove('low', 'normal', 'very-high', 'extreme');
  } else if (bmi >= 30 && bmi <= 34.9) {
    description = 'Obesidade grau 1';
    value.classList.add('very-high');
    value.classList.remove('low', 'normal', 'high', 'extreme');
  } else if (bmi >= 35 && bmi <= 39.9) {
    description = 'Obesidade grau 2';
    value.classList.add('extreme');
    value.classList.remove('normal', 'high', 'very-high', 'extreme');
  } else {
    description = 'Obesidade Mórbida';
    value.classList.add('extreme');
    value.classList.remove('low', 'normal', 'high', 'very-high');
  }

  value.textContent = bmi.replace('.', ',');
  document.getElementById('description').textContent = description;

  
});