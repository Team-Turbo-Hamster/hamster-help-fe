import axios from "axios";

export const getTicketById = async (ticket_id) => {
  try {
    const ticket = await axios.get(`/api/tickets/${ticket_id}`);
    return ticket.data.ticket;
  } catch (error) {
    console.log(error);
  }
};

export const createTicket = async (ticketForm) => {
  try {
    const ticket = await axios.post(`/api/tickets`, ticketForm, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user-token"),
      },
    });

    return ticket.data.ticket;
  } catch (error) {
    console.log(error);
  }
};
