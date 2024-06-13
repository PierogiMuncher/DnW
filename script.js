let items = [];

$(document).ready(function() {
    $('#welcome').click(function() {
        $(this).fadeOut(500, function() {
            $('#item-list').fadeIn(500);
        });
    });
});

function selectItem(item) {
    $('#item-list').fadeOut(500, function() {
        $('#item-details').fadeIn(500);
    });
}

function submitItem() {
    const name = $('#name').val();
    const cost = parseFloat($('#cost').val()).toFixed(2);
    const amount = parseInt($('#amount').val(), 10);
    const total = (cost * amount).toFixed(2);
    items.push({ name, cost, amount, total });

    $('#item-details').fadeOut(500, function() {
        $('#item-form')[0].reset();
        $('#item-list').fadeIn(500);
        alert('Done!');
    });
}

function cancelItem() {
    $('#item-details').fadeOut(500, function() {
        $('#item-list').fadeIn(500);
    });
}

function printPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const date = new Date().toLocaleDateString('en-US');
    doc.text(`Itemization for ${date}`, 10, 10);

    let y = 20;
    doc.text('Name', 10, y);
    doc.text('Cost', 50, y);
    doc.text('Amount', 90, y);
    doc.text('Total', 130, y);

    let totalSum = 0;
    items.forEach(item => {
        y += 10;
        doc.text(item.name, 10, y);
        doc.text(`$${item.cost}`, 50, y);
        doc.text(item.amount.toString(), 90, y);
        doc.text(`$${item.total}`, 130, y);
        totalSum += parseFloat(item.total);
    });

    y += 20;
    doc.text(`Total Sum: $${totalSum.toFixed(2)}`, 10, y);

    doc.save('itemization.pdf');
}