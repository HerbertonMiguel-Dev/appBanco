import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Importa o componente Picker do pacote
import Slider from '@react-native-community/slider';  // Importa o componente Slider do pacote

export default function App() {
  // Declaração de estados para armazenar dados do formulário
  // Estado para o nome do usuário
  const [nome, setNome] = useState('');  
  const [idade, setIdade] = useState('');  // Estado para a idade do usuário
  const [limite, setLimite] = useState(250);  // Estado para o limite da conta (valor inicial 250)
  const [estudante, setEstudante] = useState(false);  // Estado para verificar se o usuário é estudante
  const [sexo, setSexo] = useState(0);  // Estado para o sexo selecionado (índice do array sexos)
  const [sexos, setSexos] = useState([  // Array contendo opções de sexo
    { sexoNome: 'Masculino', valor: 1 },
    { sexoNome: 'Feminino', valor: 2 },
  ]);

  // Função chamada ao clicar no botão "Abrir Conta"
  function enviarDados() {
    if (nome === '' || idade === '') {  // Verifica se os campos nome e idade estão preenchidos
      alert('Preencha todos dados corretamente!');
      return;
    }

    // Exibe um alerta com os dados preenchidos
    alert(
      'Conta aberta com sucesso!! \n\n' +
      'Nome: ' + nome + '\n' +
      'Idade: ' + idade + ' anos' + '\n' +
      'Sexo: ' + sexos[sexo].sexoNome + ' \n' +
      'Limite Conta: R$ ' + limite.toFixed(2) + '\n' +
      'Conta Estudante: ' + (estudante ? 'Ativo' : 'Inativo')
    );
  }

  // Mapeia os itens do Picker de sexo para renderizar as opções
  let sexoItems = sexos.map((v, k) => {
    return <Picker.Item key={k} value={k} label={v.sexoNome} />;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.bancoLogo}>App Banco</Text>

      <View style={styles.areaFormulario}>
        <Text style={styles.textoNome}>Nome:</Text>
        <TextInput style={styles.input}
          placeholder="Digite seu nome"
          onChangeText={(texto) => setNome(texto)}  // Atualiza o estado nome com o texto digitado
        />

        <Text style={styles.textoNome}>Idade:</Text>
        <TextInput style={styles.input}
          placeholder="Digite sua idade"
          onChangeText={(texto) => setIdade(texto)}  // Atualiza o estado idade com o texto digitado
          keyboardType="numeric"  // Define o teclado como numérico
        />

        <View style={styles.areaSexo}>
          <Text style={styles.textoNome}>Sexo:</Text>
          <Picker style={styles.pickerSexo}
            selectedValue={sexo}
            // Atualiza o estado sexo com o valor selecionado
            onValueChange={(itemValue, itemIndex) => setSexo(itemValue)}>  
            {sexoItems}
          </Picker>
        </View>

        <View style={styles.limiteArea}>
          <Text style={styles.textoNome}>Seu Limite:</Text>
          {/* Exibe o valor do limite */}
          <Text style={styles.limiteTexto}>R$ {limite.toFixed(0)}</Text>  
        </View>

        <View style={styles.areaSlider}>
          <Slider
            minimumTrackTintColor="#CF0000"
            minimumValue={250}  // Valor mínimo do Slider
            maximumValue={2000}  // Valor máximo do Slider
            value={limite}
            onValueChange={(limite) => setLimite(limite)}  // Atualiza o estado limite com o valor do Slider
          />
        </View>

        <View style={styles.areaEstudante}>
          <Text style={styles.textoNome}>Estudante:</Text>
          <Switch
            style={{ paddingTop: 15 }}
            trackColor="#00c300"
            value={estudante}
            onValueChange={(valorEstudante) => setEstudante(valorEstudante)}  // Atualiza o estado estudante com o valor do Switch
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={enviarDados}>
          <Text style={styles.botaoTexto}>Abrir Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos para os componentes
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  areaFormulario: {
    flexDirection: 'column',
    margin: 10,
  },
  bancoLogo: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
  textoNome: {
    fontSize: 17,
    color: '#000000',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#999999',
    backgroundColor: '#EEEEEE',
    color: '#000000',
    height: 38,
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  areaSexo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  pickerSexo: {
    flex: 1,
  },
  limiteArea: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  limiteTexto: {
    color: '#FF0000',
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  areaEstudante: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botao: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 150,
    margin: 20,
  },
  botaoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
