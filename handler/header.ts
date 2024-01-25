export function generateApiKey() {
    const currentDate = new Date();
    const dateString = currentDate.toISOString().slice(0, 10);
  
    return dateString;
  }
  