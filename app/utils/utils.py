def get_report(expenses):
    dict_to_r = {}
    
    for expense in expenses:
       if expense.category not in dict_to_r:
           dict_to_r[expense.category] = expense.amount
       else:
           dict_to_r[expense.category] += expense.amount
           
    return dict_to_r
    