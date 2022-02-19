import { 
  Button, 
  Headline, 
  Icon, 
  Spinner,
  Card,
  CardHole,
  Flex,
  Link,
  Text,
  HomeButton
} from "brainly-style-guide";
import React from "react";
import ReactDOM from "react-dom";

import "./styles/basics.css";
import locales from "../../locales/ru.json";

import AppHeader from "./components/AppHeader";

const modElement = document.querySelector("#content-old > h1 .nick");
const moderator: {
  nick: string;
  link: string;
  id: number;
} = {
  nick: modElement.textContent,
  link: modElement.getAttribute("href"),
  id: +modElement.getAttribute("href").match(/\d+$/)[0],
};
console.debug("Moderator", moderator);

document.title = `${moderator.nick} | ${locales.actions}`;
document.body.innerHTML = "";
document.body.insertAdjacentHTML("afterbegin", `<div id="app"></div>`);

for (let styleLink of document.querySelectorAll('link[type="text/css"]')) {
  styleLink.remove();
}

document.head.innerHTML += `<link href="https://styleguide.brainly.com/208.2.3/style-guide.css" rel="stylesheet"/>`;

type AppState = {
  loading: boolean;
}

type ActionState = {
  disapproved: boolean;
  approved: boolean;
}

class Action extends React.Component<{}, ActionState> {
  state: ActionState = {
    approved: false,
    disapproved: false
  }

  render() {
    return (
      <Card padding="padding-small" className={
        "Action" + 
        (this.state.approved ? " Action-Approved" : 
          this.state.disapproved ? " Action-Disapproved" : "")
      }>
        <CardHole>
          <Flex justifyContent="space-between" alignItems="center">
            <Link href="/task/1" target="_blank">
              <Icon size={32} type="trash" color="icon-red-50"></Icon>
            </Link>
            <Flex direction="column" marginLeft="xs">
              <Link href="/task/1" target="_blank" className="sg-text sg-text--bold">Удален ответ</Link>
              <Text size="small">Копия/плагиат</Text>
            </Flex>
            <Flex className="Action-Operations">
              <Button onClick={
                () => this.setState({approved: true})
              } title={locales.approveAction} size="s" type="solid-mint" icon={<Icon type="thumb_up" color="adaptive" size={16} />} iconOnly className="approve-action"></Button>
              <Button onClick={
                () => this.setState({disapproved: true})
              } title={locales.disapproveAction} size="s" type="solid" icon={<Icon type="thumb_down" color="adaptive" size={16} />} iconOnly className="disapprove-action"></Button>
              <Button onClick={
                () => this.setState({disapproved: false, approved: false})
              } title={locales.revertAction} size="s" type="solid-inverted" icon={<Icon type="reload" color="adaptive" size={16} />} iconOnly className="revert-action"></Button>
            </Flex>
          </Flex>
          <Text size="small" type="div" className="Action-Content">Ответ:1 Кто является автором произведения «Беглец»?2 В каком году было написано произведение Антона Павловича Чехова «Беглец»?3. К какому литературному жанру принадлежит произведение Антона Павловича Чехова «Беглец»?4. Как звали мальчика, главного героя рассказа Антона Павловича Чехова «Беглец»?5. Что уже полгода болело у маленького Пашки?6. Что назначил доктор Иван Миколаич, чтобы восстановить руку Пашки?7. Какого зверя пообещал показать Пашке доктор Иван Миколаич?8. Сколько кроватей было в палате, где разместился Пашка?9. Кто был соседом Пашки по палате?10. Что так сильно напугало Пашку, что он сбежал из больницы?</Text>
        </CardHole>
        <CardHole color="gray-20">
          <Text size="small" type="div" className="Action-Reason">Спасибо за желание помочь, но Ваш ответ скопирован с https://obrazovaka.ru/test/beglec-chehov-s-otvetami.html. Баллы не засчитаны. Ответ должен быть выполнен самостоятельно. Копии чужих ответов, размещение ссылок на другие сайты или издания и текстов из них запрещены правилами. Пожалуйста, избегайте этого, иначе Ваш профиль может быть заблокирован или удален. </Text>
        </CardHole>
        <CardHole>
          <Flex justifyContent="space-between" alignItems="center">
            <Link href="/users/redirect_user/1" size="small" className="sg-text--bold sg-text Action-ProfileLink">Аккаунт удален</Link>
            <Flex alignItems="center">
              <Icon type="calendar" size={24} color="icon-gray-50"></Icon>
              <Text color="text-gray-70" size="small" className="sg-flex--margin-left-xxs Action-Date">18.02.2022, 12:36:36</Text>
            </Flex>
          </Flex>
        </CardHole>
      </Card>
    )
  }
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    loading: true
  }

  render() {
    return (
      <div className="js-react-container">
        <AppHeader />
        <Headline size="large">Moderator actions</Headline>
        <div className="actions">
          <Action />
          <Action />
          <Action />
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  //<div>Hello</div>,
  document.getElementById("app")
)