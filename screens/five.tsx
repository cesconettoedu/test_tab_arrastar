import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as Calendar from 'expo-calendar';
import { parse, subDays } from 'date-fns';

const Five = () => {
    const [date, setDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [events, setEvents] = useState([]);
  const [eventIdToDelete, setEventIdToDelete] = useState(''); // Armazena o ID do evento a ser deletado
  const [hour, setHour] = useState(''); // Hora do evento
  const [minute, setMinute] = useState(''); // Minuto do evento

  // Função para solicitar permissões
  const requestPermissions = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de calendário', 'Você precisa permitir o acesso ao calendário.');
    }
  };

  // Função para criar o evento no calendário
  const createEvent = async () => {
    if (!date || !eventTitle || !hour || !minute) {
      Alert.alert('Erro', 'Por favor, insira todos os dados.');
      return;
    }

    // Verifica se a data está no formato 'yyyy-MM-dd'
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
      Alert.alert('Erro', 'Formato de data inválido. Por favor, use o formato: yyyy-MM-dd');
      return;
    }

    // Verifica se a hora e os minutos estão no formato válido
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      Alert.alert('Erro', 'Formato de hora ou minuto inválido. A hora deve ser entre 00 e 23 e os minutos entre 00 e 59.');
      return;
    }

    // Converte a data fornecida para o formato Date do JavaScript e ajusta a hora e minuto
    const eventDate = parse(date, 'yyyy-MM-dd', new Date());
    eventDate.setHours(hour); // Define a hora do evento
    eventDate.setMinutes(minute); // Define os minutos do evento
    eventDate.setSeconds(0); // Define os segundos como 0

    const twoDaysBefore = subDays(eventDate, 2); // Subtrai 2 dias da data do evento

    try {
      // Obtém o calendário padrão
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const calendar = calendars.find(cal => cal.allowsModifications); // Usar o primeiro calendário editável

      if (!calendar) {
        Alert.alert('Erro', 'Não foi possível encontrar um calendário adequado.');
        return;
      }

      // Cria o evento
      const eventId = await Calendar.createEventAsync(calendar.id, {
        title: eventTitle,
        startDate: eventDate,
        endDate: eventDate,
        alarms: [
          {
            relativeOffset: -2 * 24 * 60, // Alerta 2 dias antes (em minutos)
          },
        ],
      });

      // Verifica se o evento foi criado
      if (eventId) {
        Alert.alert('Sucesso', `Evento criado com alerta 2 dias antes.`);
        console.log('Evento criado com ID:', eventId); // Imprime o ID do evento

        // Imprime as configurações do evento, incluindo os alarmes
        const eventDetails = await Calendar.getEventAsync(eventId);
        console.log('Detalhes do evento criado:', eventDetails);
      } else {
        Alert.alert('Erro', 'O evento não foi criado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o evento.');
      console.error(error);
    }
  };

  // Usar useEffect para listar todos os eventos no calendário
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão de calendário', 'Você precisa permitir o acesso ao calendário.');
          return;
        }

        // Obtém todos os calendários do dispositivo
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log("Calendários disponíveis:", calendars); // Verifique os calendários disponíveis no dispositivo

        const calendar = calendars.find(cal => cal.allowsModifications); // Usar o primeiro calendário editável

        if (calendar) {
          // Defina o intervalo de data para buscar eventos (por exemplo, de hoje até 30 dias à frente)
          const today = new Date();
          const nextMonth = new Date(today);
          nextMonth.setMonth(today.getMonth() + 1); // 1 mês à frente

          // Verifica o intervalo de datas que será usado
          console.log("Buscando eventos entre:", today, "e", nextMonth);

          // Busca os eventos entre hoje e 30 dias à frente
          const eventsList = await Calendar.getEventsAsync([calendar.id], today, nextMonth); // Passa o calendar.id, startDate e endDate corretamente
          console.log("Eventos encontrados:", eventsList);

          if (eventsList.length === 0) {
            console.log("Nenhum evento encontrado para esse intervalo.");
          } else {
            setEvents(eventsList);
            // Exibe os eventos no console
            eventsList.forEach(event => {
              console.log(`Evento: ${event.title}, ID: ${event.id}, Início: ${event.startDate}, Alarm: ${event.alarms[0].method}`);
            });
          }
        } else {
          Alert.alert('Erro', 'Não foi possível encontrar um calendário editável.');
        }
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []); // O array vazio [] significa que o efeito será executado uma vez, logo após o primeiro render

  // Função para excluir um evento baseado no ID
  const deleteEvent = async () => {
    if (!eventIdToDelete) {
      Alert.alert('Erro', 'Por favor, insira um ID de evento válido.');
      return;
    }

    try {
      // Deleta o evento baseado no ID fornecido
      const calendarId = await Calendar.deleteEventAsync(eventIdToDelete);
      console.log(`Evento com ID ${eventIdToDelete} deletado.`);

      // Confirma se o evento foi deletado, verificando se ainda existe no calendário
      try {
        await Calendar.getEventAsync(eventIdToDelete);
        Alert.alert('Erro', `O evento não foi excluído corretamente.`);
      } catch (error) {
        // O evento foi excluído com sucesso, pois não foi encontrado
        Alert.alert('Sucesso', `Evento com ID ${eventIdToDelete} deletado com sucesso.`);
        console.log(`Evento com ID ${eventIdToDelete} deletado com sucesso.`);
      }

      setEventIdToDelete(''); // Limpar o campo após a exclusão
      setEvents(events.filter(event => event.id !== eventIdToDelete)); // Atualiza a lista de eventos após a exclusão
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o evento.');
      console.error('Erro ao excluir evento:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contDelete}>
        <TextInput
          style={[styles.input, {height: '100%'}]}
          placeholder="ID do evento para deletar"
          value={eventIdToDelete}
          onChangeText={setEventIdToDelete}
          />
        <TouchableOpacity style={styles.deleteBtn} onPress={deleteEvent} >
          <Text style={styles.textbtn}>Deletar Evento</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Título do evento"
        value={eventTitle}
        onChangeText={setEventTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (0-23)"
        value={hour}
        onChangeText={setHour}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Minutos (0-59)"
        value={minute}
        onChangeText={setMinute}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.deleteBtn} onPress={() => {
        requestPermissions(); // Certifica-se de que as permissões são solicitadas
        createEvent();
      }}>
        <Text style={styles.textbtn}>
          Criar Evento
        </Text>
      </TouchableOpacity>
  

      <Text style={{fontWeight: 'bold', fontSize: 20, paddingTop: 20, textDecorationLine: 'underline'}}>Eventos Criados</Text>
      {/* Exibe todos os eventos na tela */}
      <ScrollView contentContainerStyle={{paddingTop:10, paddingBottom:'40%'}}>
        {events
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) // Ordena os eventos pela data de início
          .map((event) => (
            <View key={event.id}>
              <Text>
                {`Evento Title:  ${event.title},
                 \nID: ${event.id}, 
                 \nInício: ${new Date(event.startDate).toLocaleString()},
                 \nFim: ${new Date(event.endDate).toLocaleString()},
                 \nAlarme: ${event.alarms[0]?.relativeOffset || 'Não definido'} minutos antes,
                 \n---------------------------`}
              </Text>
            </View>
          ))}
      </ScrollView>
    </View>
     
    
  )
}

export default Five

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'lightyellow', 
    paddingTop: '10%',
    paddingHorizontal: '10%',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  contDelete: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  deleteBtn: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  textbtn: {
    textAlign:'center', 
    color:'#ffffff'
  }
})