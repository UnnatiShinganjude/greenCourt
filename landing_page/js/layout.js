// Assuming some tables are already booked (for example: T1, T2, T4)
const bookedTables = ['T1', 'T2', 'T4']; // These tables are already booked
let totalAmount = 0;

// Initialize the state for booked tables (disable them)
bookedTables.forEach(tableId => {
    const table = document.getElementById(tableId);
    table.disabled = true; // Disable the checkbox for booked tables
});

// Function to update the total price and table count
function updateAmountAndCount() {
    let selectedCount = 0;
    totalAmount = 0;

    // Corrected selector to match your structure
    const checkboxes = document.querySelectorAll('input.table[type="checkbox"]:not(:disabled)');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            totalAmount += 100; // Add ₹100 for each selected table
            selectedCount++; // Increment the selected count
        }
    });

    // Update the displayed total amount and table count
    document.querySelector('.count').textContent = selectedCount;
    document.querySelector('.amount').textContent = '₹' + totalAmount;
}

// Add event listeners to all table checkboxes (including newly selected ones)
const checkboxes = document.querySelectorAll('input.table[type="checkbox"]');
checkboxes.forEach(checkbox => {
    if (!checkbox.disabled) { // Only for non-disabled tables
        checkbox.addEventListener('change', function() {
            updateAmountAndCount(); // Update when a table is selected or deselected
        });
    }
});

// Initial update for setting count and amount to 0
updateAmountAndCount();
