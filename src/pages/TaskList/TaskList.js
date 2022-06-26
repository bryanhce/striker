//this page has been deprecated
import React, { useContext, useEffect, useRef, useState } from "react";
import "./TaskList.css";
import {
  Button,
  Divider,
  Progress,
  Form,
  Input,
  Popconfirm,
  Table,
} from "antd";
import StrikerLayout from "../StrikerLayout/StrikerLayout";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { format } from "date-fns";

//code to connect to firestore database
const db = getFirestore();
const colRef = collection(db, "taskList");
let data = [];

var count = 0;
getDocs(colRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      data.push({
        key: count,
        id: doc.id,
        task: doc.data().task,
        priority: doc.data().priority,
        effort: doc.data().effort,
        isCompleted: doc.data().isCompleted,
      });
      count++;
    });
  })
  .catch((err) => console.log(err));

// const data = [
//   {
//     key: 1,
//     task: "Complete cs2030s lab8",
//     priority: "high",
//     effort: 65,
//     isCompleted: false,
//   },
//   {
//     key: 2,
//     task: "Wish Bryan happy brithday",
//     priority: "high",
//     effort: 5,
//     isCompleted: false,
//   },
//   {
//     key: 3,
//     task: "Medical appointment at 530pm",
//     priority: "low",
//     effort: 15,
//     isCompleted: true,
//   },
//   {
//     key: 4,
//     task: "Read 3 chapters of Data Structures and Alogirthm",
//     priority: "high",
//     effort: 45,
//     isCompleted: false,
//   },
//   {
//     key: 5,
//     task: "Run 5km",
//     priority: "medium",
//     effort: 20,
//     isCompleted: true,
//   },
// ];

function calculateProgressPercentage(data) {
  const completedTasks = data.filter((obj) => obj.isCompleted);
  return Math.ceil((completedTasks.length / data.length) * 100);
}

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const todayDay = format(new Date(), "E").toUpperCase();
//use "EEEE" for full day name

const TaskList = () => {
  //user can be used to do personalised things in the future
  // const { user } = useUserAuth();

  const defaultColumns = [
    {
      title: "Task",
      dataIndex: "task",
      width: "40%",
      editable: true,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      editable: true,
    },
    {
      title: "Effort",
      dataIndex: "effort",
      editable: true,
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <button>Delete</button>
          </Popconfirm>
        ) : null,
    },
    {
      title: "Complete",
      dataIndex: "complete",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <button onClick={() => completeHandler(record.key)}>Complete</button>
        ) : null,
    },
  ];

  const [dataSource, setDataSource] = useState(data);
  //6 because there are 6 items in the current data set

  const addHandle = () => {
    const newData = {
      key: count,
      task: "add task here",
      priority: "low",
      effort: 0,
      isCompleted: false,
    };
    setDataSource([...dataSource, newData]);
    count++;
    const firestoreNewData = {
      task: "add task here",
      priority: "low",
      effort: 0,
      isCompleted: false,
    };
    addDoc(colRef, firestoreNewData);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
    const docRef = doc(db, "taskList", item.id);
    updateDoc(docRef, item).catch((err) => err.message);
  };

  const handleDelete = (id) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
    const docRef = doc(db, "taskList", id);
    deleteDoc(docRef);
  };

  //todo update isCompleted in the database as well
  const completeHandler = (key) => {
    setDataSource(
      dataSource.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        }
        return item;
      })
    );
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    const item = newData[index];
    item.isCompleted = !item.isCompleted;
    const docRef = doc(db, "taskList", item.id);
    updateDoc(docRef, item).catch((err) => err.message);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <StrikerLayout>
      <div>
        <Divider orientation="left">{todayDay}</Divider>
        <Button
          type="primary"
          onClick={addHandle}
          style={{
            marginBottom: 16,
          }}
        >
          Add a task
        </Button>
        <Table
          components={components}
          bordered
          dataSource={dataSource}
          columns={columns}
          rowClassName={(record, _) =>
            record.isCompleted ? "task-completed editable-row" : "editable-row"
          }
        />

        <br />
        <Progress
          percent={calculateProgressPercentage(dataSource)}
          status="active"
        />
      </div>
    </StrikerLayout>
  );
};

export default TaskList;
