print("This is a simple To-Do list application.")
list_of_tasks = []
while True:
    print("\nOptions:")
    print("1. Add a task")
    print("2. View tasks")
    print("3. Remove a task")
    print("4. Exit")
    
    choice = input("Enter your choice (1-4): ")
    
    if choice == '1':
        task = input("Enter the task: ")
        list_of_tasks.append(task)
        print(f"Task '{task}' added.")
        
    elif choice == '2':
        if not list_of_tasks:
            print("No tasks in the list.")
        else:
            print("Tasks:")
            for index, task in enumerate(list_of_tasks, start=1):
                print(f"{index}. {task}")
                
    elif choice == '3':
        if not list_of_tasks:
            print("No tasks to remove.")
        else:
            print("Tasks:")
            for index, task in enumerate(list_of_tasks, start=1):
                print(f"{index}. {task}")
            task_number = int(input("Enter the number of the task to remove: "))
            if 1 <= task_number <= len(list_of_tasks):
                removed_task = list_of_tasks.pop(task_number - 1)
                print(f"Task '{removed_task}' removed.")
            else:
                print("Invalid task number.")
                
    elif choice == '4':
        print("Exiting the application.")
        break
        
    else:
        print("Invalid choice. Please try again.")


file_name = "/Users/krishb/krishApps/pythonprogs/tasks.txt"
with open(file_name, 'w') as file:
    for task in list_of_tasks:
        file.write(task + '\n')
print(f"Tasks saved to {file_name}.")
