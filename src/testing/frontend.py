from hashlib import new
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
import datetime
import time


driver = webdriver.Chrome(ChromeDriverManager().install())
action = ActionChains(driver)

today = datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
todays_date = datetime.date.today().strftime("%d-%m-%y")
print("Testing Date: " + today)

#Get to Striker Website:
striker_url = "https://striker-frontend.herokuapp.com/"
print("Testing Frontend of URL: " + striker_url)
driver.get(striker_url)

def testcase_template(number, testing, fail):
    print("------------------------------------------------------")
    testcase_string = "Test Case #" + str(number)
    print("Starting " + testcase_string + ":")
    try:
        testing()
        print(testcase_string + " Success")

    except Exception as e:
        print("Something went wrong in " + testcase_string + ":")
        print(e)
        fail()
    print("------------------------------------------------------")
    time.sleep(1)

def null_fail():
    return

#Test Cases:
def testcase1():
    #Wait for signup button
    wait = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "basic_email")))
    signup_button = driver.find_element(By.LINK_TEXT, "Create Account")
    signup_button.click()

    #Wait for new email bar
    wait = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.ID, "basic_email")))
    signup_email = driver.find_element(By.ID, "basic_email")
    signup_password = driver.find_element(By.ID, "basic_password")
    send_signup_button = driver.find_element(By.CLASS_NAME, "ant-btn-round")

    #Fill details
    print("Using Test Email: " + todays_date + "@gmail.com")
    print("Using Test Password: " + todays_date)
    signup_email.send_keys(todays_date + "@gmail.com")
    signup_password.send_keys(todays_date)
    send_signup_button.click()

    #Wait for signup success
    wait = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CLASS_NAME, "ant-notification-notice-message")))
    notif = driver.find_element(By.CLASS_NAME, "ant-notification-notice-message")
    if notif.text == "Sign Up Failed":
        raise Exception("Sign Up Failed")
def testcase1_fail():
    login_link = driver.find_element(By.LINK_TEXT, "Login here")
    login_link.click()

def testcase2():
    #Wait for email box
    wait = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.ID, "basic_email")))
    email_box = driver.find_element(By.ID, "basic_email")
    password_box = driver.find_element(By.ID, "basic_password")
    login_button = driver.find_element(By.CLASS_NAME, "ant-btn-round")

    #Fill details
    print("Using Registered Email: " + todays_date + "@gmail.com")
    print("Using Registered Password: " + todays_date)
    email_box.send_keys(todays_date + "@gmail.com")
    password_box.send_keys(todays_date)
    login_button.click()

    #Wait for signup success
    wait = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CLASS_NAME, "border-day")))
def testcase2_fail():
    #Base Details
    backup_email = "silastay@hotmail.com"
    backup_password = "123456789"
    email_box = driver.find_element(By.ID, "basic_email")
    password_box = driver.find_element(By.ID, "basic_password")
    login_button = driver.find_element(By.CLASS_NAME, "ant-btn-round")

    email_box.clear()
    password_box.clear()
    login_button.click()
    wait = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CLASS_NAME, "border-day")))

def testcase3():
    #Find AddTask button
    add_task_button = driver.find_element(By.CLASS_NAME, "addTask")
    add_task_button.click()

    #Check if new task exists
    wait = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CLASS_NAME, "task")))

def testcase4():
    #Find Strike button
    strike_button = driver.find_element(By.CLASS_NAME, "strikeBtn")
    original_image = strike_button.get_attribute("src")
    strike_button.click()

    strike_button.send_keys(Keys.DOWN)
    if (original_image == strike_button.get_attribute("src")):
        raise Exception("Strike Button did not change")

def testcase5():
    #Find Task Text field
    task_text = driver.find_element(By.CLASS_NAME, "taskText")
    task_text.send_keys("test")
    if not task_text.text:
        raise Exception("Task text is null")
    if task_text.text != "test":
        raise Exception("Task text is not the same")

def testcase6():
    #Find Task Priority field
    priority = driver.find_element(By.CLASS_NAME, "priority")
    priority.send_keys(Keys.DOWN)
    if "yellow" not in priority.get_attribute("class"):
        raise Exception("Priority did not change")

def testcase7():
    #Find Task Effort field
    effort = driver.find_element(By.CLASS_NAME, "taskEffort")
    effort.send_keys(Keys.BACKSPACE)
    effort.send_keys("10")
    if not effort.text:
        raise Exception("Task text is null")

def testcase8():
    #Find Strike button
    strike_button = driver.find_element(By.CLASS_NAME, "strikeBtn")
    action.double_click(strike_button).perform()

    wait = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "striked")))

def testcase9():
    #Find Filter Header
    task_filter_header = driver.find_element(By.CLASS_NAME, "filterableHeader")
    task_filter_header.click()

    wait = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "hidden")))
    time.sleep(2)

    task_filter_header.click()
    time.sleep(1)
    new_task = driver.find_element(By.CLASS_NAME, "task")
    if "hidden" in new_task.get_attribute("class"):
        raise Exception("Task filter not showing completed tasks")
    
    task_filter_header.click()
    time.sleep(1)
    wait = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "task")))

def testcase10():
    #Find Add Task
    add_task = driver.find_element(By.CLASS_NAME, "addTask")
    add_task.click()

    #Order by Priority
    priority_header = driver.find_element(By.CLASS_NAME, "priorityHeader")
    priority_header.click()
    time.sleep(1)
    priority_header.click()

    #Check if first task is new
    newest_task_priority = driver.find_element(By.CLASS_NAME, "priority")
    if "green" not in newest_task_priority.get_attribute("class"):
        raise Exception("Tasks not ordered by Priority")

def testcase11():
    #Order by Effort
    effort_header = driver.find_element(By.CLASS_NAME, "effortHeader")
    effort_header.click()
    time.sleep(1)
    effort_header.click()

    #Check if first task is new
    newest_task_effort = driver.find_element(By.CLASS_NAME, "taskEffort")
    if newest_task_effort.text != "10":
        raise Exception("Tasks not ordered by Effort")

def testcase12():
    #Delete tasks
    delete_button = driver.find_element(By.CLASS_NAME, "deleteTask")
    delete_button.click()
    time.sleep(1)
    delete_button = driver.find_element(By.CLASS_NAME, "deleteTask")
    delete_button.click()
    time.sleep(1)

    #Check if first task is new
    tasks = driver.find_elements(By.CLASS_NAME, "task")
    if tasks:
        raise Exception("Delete button doesn't delete tasks")

def testcase13():
    #Monthly tasklist tab
    monthly_tab = driver.find_elements(By.CLASS_NAME, "ant-menu-title-content")[4]
    monthly_tab.click()
    time.sleep(1)

    #Check if first task is new
    wait = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CLASS_NAME, "border-month")))


    #Find AddTask button
    add_task_button = driver.find_element(By.CLASS_NAME, "addTask")
    add_task_button.click()

    #Check if new task exists
    wait = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CLASS_NAME, "task")))

def testcase17():
    #Find Task Priority field
    deadline = driver.find_element(By.CLASS_NAME, "deadline")
    deadline.click()
    deadline.send_keys("01012000")
    
    other = driver.find_element(By.CLASS_NAME, "border-month")
    other.click()

    print(deadline.get_attribute("placeholder"))
    if deadline.get_attribute("placeholder") != "01-01-2000":
        raise Exception("Deadline did not change")

def testcase18():
    #Find Task Progress field
    progress = driver.find_element(By.CLASS_NAME, "taskProgress")
    progress.send_keys(Keys.DOWN)
    print(progress.text)
    if progress.text != "In Progress":
        raise Exception("Progress did not change")

def testcase19():
    #Find Strike button
    strike_button = driver.find_element(By.CLASS_NAME, "strikeBtn")
    action.double_click(strike_button).perform()

    wait = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "striked")))

def testcase21():
    #Find Add Task
    add_task = driver.find_element(By.CLASS_NAME, "addTask")
    add_task.click()

    #Order by Deadline
    priority_header = driver.find_element(By.CLASS_NAME, "deadlineHeader")
    priority_header.click()
    time.sleep(1)
    priority_header.click()

    #Check if first task is new
    newest_task_priority = driver.find_element(By.CLASS_NAME, "deadline")
    if newest_task_priority.text != "Haven't Started":
        raise Exception("Tasks not ordered by Priority")

def testcase22():
    #Order by Effort
    progress_header = driver.find_element(By.CLASS_NAME, "progressHeader")
    progress_header.click()
    time.sleep(1)
    progress_header.click()

    #Check if first task is new
    newest_task_effort = driver.find_element(By.CLASS_NAME, "taskProgress")
    if newest_task_effort.text != "In Progress":
        raise Exception("Tasks not ordered by Effort")

def testcase23():
    #Delete tasks
    delete_button = driver.find_element(By.CLASS_NAME, "deleteTask")
    delete_button.click()
    time.sleep(1)
    delete_button = driver.find_element(By.CLASS_NAME, "deleteTask")
    delete_button.click()
    time.sleep(1)

    #Check if first task is new
    tasks = driver.find_elements(By.CLASS_NAME, "task")
    if tasks:
        raise Exception("Delete button doesn't delete tasks")

def testcase24():
    #Monthly tasklist tab
    monthly_tab = driver.find_elements(By.CLASS_NAME, "ant-menu-title-content")[8]
    monthly_tab.click()
    time.sleep(1)

    #Check if first task is new
    wait = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CLASS_NAME, "ant-tabs-tab")))
    user_details_tab = driver.find_elements(By.CLASS_NAME, "ant-tabs-tab")[1]
    user_details_tab.click()
    
    wait = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CLASS_NAME, "ant-btn-danger")))
    delete_account_btn = driver.find_element(By.CLASS_NAME, "ant-btn-danger")
    delete_account_btn.click()

    wait = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CLASS_NAME, "ant-btn-dangerous")))
    delete_account_confirm_btn = driver.find_element(By.CLASS_NAME, "ant-btn-dangerous")
    delete_account_confirm_btn.click()
    

#Calling of Test Cases:
testcase_template(1, testcase1, testcase1_fail)
testcase_template(2, testcase2, testcase2_fail)
testcase_template(3, testcase3, null_fail)
testcase_template(4, testcase4, null_fail)
testcase_template(5, testcase5, null_fail)
testcase_template(6, testcase6, null_fail)
testcase_template(7, testcase7, null_fail)
testcase_template(8, testcase8, null_fail)
testcase_template(9, testcase9, null_fail)
testcase_template(10, testcase10, null_fail)
testcase_template(11, testcase11, null_fail)
testcase_template(12, testcase12, null_fail)
testcase_template(13, testcase13, null_fail)
testcase_template(14, testcase3, null_fail)
testcase_template(15, testcase4, null_fail)
testcase_template(16, testcase5, null_fail)
testcase_template(17, testcase17, null_fail)
testcase_template(18, testcase18, null_fail)
testcase_template(19, testcase19, null_fail)
testcase_template(20, testcase9, null_fail)
testcase_template(21, testcase21, null_fail)
testcase_template(22, testcase22, null_fail)
testcase_template(23, testcase23, null_fail)
testcase_template(24, testcase24, null_fail)

print("------------------------------------------------------")
print("Testing Complete!")
time.sleep(5)

driver.quit()
