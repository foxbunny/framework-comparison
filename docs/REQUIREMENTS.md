# Product management app

## Entities

### Administrator

Users with access to edit the product list and the product highlight.

- username (text)
- password (text, hashed)

### Product

Items in the product list.

- SKU (primary key)
- name (text)
- description (text)
- quantity unit (one of the: liter, kg, piece, pair)
- stock (positive integer)
- price (positive integer, in cents)
- updated (timestamp)

### Product highlight

A singular ordered list of products that are "highlighted" (possibly for use 
in a web shop app).

- SKU (reference)
- order (positive integer)

10 products at most can be in the highlights list at a time.

## Scenarios

### Logging in

I can log in by entering the username and password in the log-in form.

If I enter the incorrect credentials, I'm shown an error message.

If I enter the correct credentials, I'm taken to the product list.

### Logging out

I can log out by clicking on the "Log out" button in the page header.

Once I log out, I'm taken to the log-in form.

### Product list

If I access the product list while logged out, I will be taken to the log in
screen.

While the product are being loaded, I see a "Loading" message.

If the product list is empty, I see a "There are no products in the database." 
message, and a button to create a product.

If the product list is populated, I see a table with the following columns:

- Name
- Description (icon)
- SKU
- Unit
- Stock
- Out of stock warning icon
- Date of update
- Action (contains a delete button by default)

I can hover the description icon to see the description text as a tooltip. 
It also appears when I focus the icon using the keyboard.

### Deleting the products

When I press the delete button in the "Action" column, a confirmation 
message appears asking if I would like to delete the product in that row. 
The product name and SKU are included in the message to remind me which 
product I'm about to delete.

I can confirm the deletion by pressing the "Delete" button. After deletion is 
confirmed, the product list reloads and the confirmation message closes.

I can cancel the deletion by pressing the "Don't delete" button. After 
deletion is cancelled, the confirmation message closes.

### Editing the product details

I can click the "Name", "SKU", "Unit" and "Stock" fields. If I tab into them 
or click on them, they go into edit mode, and turn into text fields. The 
"Action" column displays a confirmation and cancellation buttons.

When I want to save the changes, I can click the confirmation button or 
press the Enter key to save. When I do that, the entire table is greyed out, 
and a spinner appears in place of the confirmation button icon, indicating 
progress. When saving finishes, the table is restored to its previous 
appearance and the spinner disappears.

When saving fails, a message popups up declaring that saving failed.

When I want to cancel the changes, I can click the cancellation button or 
press the Esc key to cancel. The fields are reverted to their original state 
when I cancel.

### Editing the product description

When I click the description icon a modal dialog opens that lets me edit the 
text. The dialog has a title bar that says "Descrption", an "x" button, a 
disabled confirmation button, and cancellation button.

When I modify the description text, the confirmation button becomes available.

I can click the confirmation button to save the changes. The dialog greys 
out and a spinner appears in the button to indicate progress.

When saving succeeds, the dialog closes.

When saving fails, the dialog returns to its normal appearance, the spinner 
disappears, and a message pops up declaring that the saving failed.

I can click the cancellation button or the "x" button, or press the Esc key to 
cancel the edit. The dialog closes immediately.

### Adding to product highlight

I can add a product by dragging it to the product highlight icon.

When I grab a product to drag it, it starts dragging after 1 second. As soon 
as dragging starts, the product highlight icon is highlighted.

When I start dragging, and the product highlights it at its limit of 10 
products, the icon turns into a word "MAX" and it becomes greyed out.

When I drag the product into the product highlight icon it turns into a "+" 
icon. If the product highlights list is at its capacity, the icon does not 
turn into a "+" and dropping is prevented.

When I drop the product onto the product highlight icon, it confirms by 
turning into a "checkmark" icon for 3 seconds. Then it reverts back to the 
default product highlight icon.

When I drop the product anywhere outside the product highlight icon, the 
drag is cancelled.

The product highlights icon has a circular progress bar around it which 
fills as I drop products into it.

### Accessing product highlights

I can open the product highlights by clicking the product highlights icon.

When I click the product highlights icon, a modal dialog opens that shows 
the highlighted products and a greyed out confirmation and normal 
cancellation buttons. The dialog has a title bar that says "Product highlights"
and an "x" icon to close it.

I can also press the Ctrl+Alt+H (Cmd+Alt+H) shortcut to open the list.

### Highlights list

When there are no highlighted products, I can see a message that says 
"Please drag some products onto the product highlights icon to add them to 
this list. Use the Cancel button or the Escape key to close this dialog."

Whe there are products in the list, I can see a table with three columns:

- Name
- SKU
- Delete

### Removing items from the highlights

When I press the delete button in the "Delete" column, a confirmation
message appears asking if I would like to delete the product in that row.
The product name and SKU are included in the message to remind me which
product I'm about to delete.

I can confirm the deletion by pressing the "Delete" button. After deletion is
confirmed, the product list reloads and the confirmation message closes.

I can cancel the deletion by pressing the "Don't delete" button. After
deletion is cancelled, the confirmation message closes.

NOTE: This feature behaves the same way as the "Delete" button in the 
product list, so we have a concept of tables containing deletable rows.

### Ordering the highlights

I can order the highlights by dragging them. 

When I click and hold an item, it starts dragging after 1 second. 

When I start dragging an item, it is removed from its spot and follows 
cursor. The possible places to drop it are shown as empty spaces between 
adjacent items when the dragged item floats over them.

When I drop an item, it is placed at the closest empty space, and the 
ordering is confirmed.

When I change the order of the items, the confirmation button becomes available.

### Saving the product highlights order

When I reorder the items in the product highlights, I can save the list by 
clicking the confirmation button.

When I click the confirmation button, the dialog becomes greyed out and a 
spinner appears on the button to indicate progress. 

When saving succeeds the dialog closes.

When saving fails, the dialog is restored to its previous state, the spinner 
disappears, and an error message popups up declaring that the list could not 
be saved.

### Closing the product highlights list

I can close the product highlights list (without saving) by clicking the 
cancellation button, clicking the "x" icon in the dialog's title bar or by 
pressing the Esc key.

When there are no changes, the dialog closes immediately. If there are changes,
I will see a message that asks me "There are unsaved changes. What would you 
like to do?" with the options "Save and close", and "Just close".

When I click the "Save and close" button, the dialog behaves the same as if 
the "Save" button was clicked, and the popup message is closed.

When I click the "Just close" button, both the popup message and the dialog 
are closed immediately.
