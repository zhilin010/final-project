// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

export function formatDate(dateString: string): string { 
    // format the date string to a more readable format
    
    return new Date(dateString).toLocaleString("en-US", 
    {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

