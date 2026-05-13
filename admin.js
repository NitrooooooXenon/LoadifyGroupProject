// NEW: Open full admin dashboard
window.openFullAdmin = function() {
    window.open('admin-dashboard.html', '_blank');
}

// NEW: Export orders (bonus feature)
window.exportOrders = function() {
    if (!orders || orders.length === 0) {
        showTemporaryMessage('No orders to export', '#ff9800');
        return;
    }
    
    let csv = 'Order ID,Customer Name,Phone,Total,Payment,Status,Tracking,Date\n';
    orders.forEach(o => {
        csv += `"${o.id}","${o.customer?.name || ''}","${o.customer?.phone || ''}","${o.total}","${o.payment}","${o.status}","${o.tracking}","${new Date(o.createdAt).toLocaleString()}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loadify-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showTemporaryMessage('✅ Orders exported!', '#4CAF50');
}

// ENSURE localStorage sync works across tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'orders') {
        orders = JSON.parse(e.newValue || '[]');
        if (document.getElementById('adminOrdersList')) {
            buildAdminList();
        }
    }
});