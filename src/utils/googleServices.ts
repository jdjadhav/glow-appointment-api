
export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees: Array<{
    email: string;
    displayName?: string;
    responseStatus: 'needsAction' | 'declined' | 'tentative' | 'accepted';
  }>;
  conferenceData?: {
    conferenceSolution: {
      key: {
        type: 'hangoutsMeet';
      };
    };
    createRequest: {
      requestId: string;
    };
  };
  hangoutLink?: string;
}

export interface GoogleMeetResponse {
  meetingUrl: string;
  meetingCode: string;
  dialIn: {
    phoneNumber: string;
    pin: string;
  };
}

// Simulate Google Calendar API
export const createCalendarEvent = async (
  patientName: string,
  patientEmail: string,
  doctorName: string,
  doctorEmail: string,
  date: string,
  time: string,
  service: string,
  notes?: string
): Promise<GoogleCalendarEvent> => {
  console.log('🗓️ Creating Google Calendar Event...');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const startDateTime = new Date(`${date}T${time}:00`);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour appointment
  
  const event: GoogleCalendarEvent = {
    id: eventId,
    summary: `Medical Appointment: ${service}`,
    description: `
Patient: ${patientName}
Doctor: ${doctorName}
Service: ${service}
${notes ? `Notes: ${notes}` : ''}

This appointment includes a Google Meet video call.
    `.trim(),
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'America/New_York'
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'America/New_York'
    },
    attendees: [
      {
        email: patientEmail,
        displayName: patientName,
        responseStatus: 'needsAction'
      },
      {
        email: doctorEmail,
        displayName: doctorName,
        responseStatus: 'accepted'
      }
    ],
    conferenceData: {
      conferenceSolution: {
        key: {
          type: 'hangoutsMeet'
        }
      },
      createRequest: {
        requestId: `meet_${eventId}`
      }
    }
  };
  
  console.log('✅ Calendar Event Created:', event);
  return event;
};

// Simulate Google Meet API
export const createMeetingRoom = async (eventId: string): Promise<GoogleMeetResponse> => {
  console.log('📹 Creating Google Meet Room...');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const meetingCode = `${Math.random().toString(36).substr(2, 3)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 3)}`;
  
  const meetResponse: GoogleMeetResponse = {
    meetingUrl: `https://meet.google.com/${meetingCode}`,
    meetingCode: meetingCode,
    dialIn: {
      phoneNumber: '+1-555-MEET-NOW',
      pin: Math.floor(Math.random() * 900000000 + 100000000).toString()
    }
  };
  
  console.log('✅ Google Meet Room Created:', meetResponse);
  return meetResponse;
};

// Simulate sending calendar invitations
export const sendCalendarInvitations = async (event: GoogleCalendarEvent): Promise<boolean> => {
  console.log('📧 Sending Calendar Invitations...');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  console.log('✅ Calendar Invitations Sent to:');
  event.attendees.forEach(attendee => {
    console.log(`   - ${attendee.displayName} (${attendee.email})`);
  });
  
  return true;
};

// Simulate email notifications
export const sendAppointmentEmails = async (
  patientEmail: string,
  doctorEmail: string,
  appointmentDetails: any,
  meetingUrl: string
): Promise<boolean> => {
  console.log('📨 Sending Appointment Confirmation Emails...');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  console.log('✅ Emails sent:');
  console.log(`   - Confirmation email to patient: ${patientEmail}`);
  console.log(`   - Notification email to doctor: ${doctorEmail}`);
  console.log(`   - Meeting details included: ${meetingUrl}`);
  
  return true;
};
