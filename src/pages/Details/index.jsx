import { useState, useEffect } from "react";
import { Container, Links, Content } from "./styles";
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Tag } from "../../components/Tag";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";

export function Details() {
  const [data, setData] = useState(null);

  const params = useParams();
  const navigete = useNavigate()

  function handleBack(){
    navigete("/")
  }

  async function handleRemove(){
    const confirm = window.confirm("Deseja realmente apagar essa nota ?")

    if(confirm) {
      await api.delete(`/notes/${params.id}`);
      navigete("/")
    }
  }
  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }

    fetchNotes();
  }, []);

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText 
              title="Excluir nota" 
              onClick={handleRemove}
              />

            <h1>{data.title}</h1>

            <p>{data.description}</p>

            {data.Links && (
              <Section title="Links úteis">
                <Links>
                  {data.Link.map((link) => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank"></a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {data.tags && (
              <Section title="Marcadores">
                { 
                  data.tags.map(tag => (
                    <Tag 
                    key={String(tag.id)}
                    title="express" 
                    />
                  ))
                }
              </Section>
            )}
            <Button 
              title="Voltar" 
              onClick={handleBack} 
            />
          </Content>
        </main>
      )}
    </Container>
  );
}
