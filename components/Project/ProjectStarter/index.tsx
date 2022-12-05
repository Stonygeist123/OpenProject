// import Button from "../../common/Button";
// import ToggleButton from "../../common/ToggleButton/ToggleButton";
// import styles from "../../../styles/pages/project/create/index.module.scss";
// import { useFormikContext } from "formik";
// import { Formik, Field, Form, FormikHelpers } from "formik";

// const ProjectStarter = ({ tags, setTags }: { tag: string; tags: []; setTags: () => {}; setTag: () => {} }) => {
//   //   const { values, handleSubmit, handleChange, initialValues } = useFormikContext();
//   interface Values {
//     name: string;
//     description: string;
//   }

//   return (
//     <Formik
//       initialValues={{
//         name: "",
//         description: "",
//       }}
//       onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
//         console.log(values);
//       }}
//     >
//       <Form>
//         <h1 className={styles["title"]}> Create a new project! </h1>
//         <div className={styles["content-wrapper"]}>
//           <Field
//             className={styles["input"]}
//             placeholder="Enter a name..."
//           />
//           {/* {values.projectFound ? (
//             <label style={{ color: "red" }}>Project &ldquo;{name}&rdquo; does already exist.</label>
//           ) : values.nameProvided === values.Provided.No ? (
//             <label style={{ color: "red" }}>No name provided.</label>
//           ) : null} */}
//           <div className={styles["input-wrapper"]}>
//             <input
//               className={styles["input"]}
//               placeholder="Enter categories/tags"
//               onChange={e => {
//                 const value = e.target.value;
//                 setTag(value);
//               }}
//               value={tag}
//               onKeyDown={e => {
//                 if (e.key === "Enter") {
//                   if ((tag + e.key).split("").some(s => isNaN(parseInt(s)) && !s.match(/[a-zA-Z]/i) && s !== "-" && s !== "_" && s !== " "))
//                     return setUnexpected(true);
//                   else setUnexpected(false);

//                   e.preventDefault();
//                   if (tags.includes(tag) || tag.trim() === "") return;
//                   setTag("");
//                   setTags(ts => [...ts, tag.trim() + " "]);
//                 }
//               }}
//             />
//             <div className={styles["tags"]}>
//               {tags.length === 0
//                 ? null
//                 : tags.map((t, i) => (
//                     <>
//                       <div className={styles["tag"]}>
//                         <code className={styles["tag-text"]}>{t}</code>
//                         <p
//                           id={`tag-${i}`}
//                           className={styles["tag-cross"]}
//                           onClick={() => {
//                             tags[i] = null;
//                             setTags(tags.filter(t => t !== null));
//                           }}
//                         >
//                           ×
//                         </p>
//                       </div>
//                     </>
//                   ))}
//             </div>
//           </div>
//           <div>
//             <textarea
//               className={styles["description-input"]}
//               placeholder="Description"
//               value={values.description}
//               onChange={e => setDescription(e.currentTarget.value)}
//             ></textarea>
//             <ToggleButton
//               setState={handlechange}
//               value={values.isPrivate}
//               text="Set on private"
//               className={styles["toggle-private-checkbox"]}
//             />
//           </div>
//           <div className={styles["footer"]}>
//             <div className={`${styles["button-container"]}`}>
//               <Button
//                 isSubmit
//                 text="Next"
//               />
//             </div>
//           </div>
//         </div>
//       </Form>
//     </Formik>
//   );
// };

// export default ProjectStarter;

export default function x() {
  return <p></p>;
}
