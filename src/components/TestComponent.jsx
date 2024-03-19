const TestComponent = function (props) {
  // se l'oggetto si chiama "props", la mia prop color si troverà in -> props.color
  return (
    <div>
      <p style={{ color: props.color }}>
        {/* ogni valore di prop o attributo in JSX che NON È una stringa va delimitato da un paio di graffe {} */}
        {/* poichè in JSX "style" non accetta una stringa ma un oggetto, ci vogliono DUE paia di graffe:
        una esterna perchè appunto non è un valore stringa
        un altro paio "interno" come delimitatore dell'oggetto */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
        deleniti rerum necessitatibus, voluptate voluptatum itaque aut
        doloremque temporibus labore animi tempore quaerat harum? Placeat beatae
        quae, odit maiores itaque cumque!
      </p>
    </div>
  )
}

export default TestComponent
